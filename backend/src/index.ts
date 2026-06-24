/**
 * docs.siakadku.com Backend API
 * Express.js + TypeScript — Port 1919
 * Data stored in JSON files (data/docs.json, data/users.json)
 */

const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

// ============ CONFIG ============
const PORT = 1919;
const JWT_SECRET = process.env.JWT_SECRET || 'docs-siakadku-secret-key-2026';
const DATA_DIR = path.join(__dirname, '..', 'data');

// ============ TYPES ============
interface Doc {
  id: string;
  slug: string;
  title: string;
  category: string;
  content: string;      // Markdown content
  description: string;  // Short description for listing
  order: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

interface User {
  id: string;
  username: string;
  password: string; // bcrypt hash
  role: 'admin' | 'editor';
}

// ============ HELPERS ============

// Baca file JSON (create if not exists)
function readJson<T>(filename: string, defaultValue: T): T {
  const filePath = path.join(DATA_DIR, filename);
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(defaultValue, null, 2));
    }
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch {
    return defaultValue;
  }
}

// Tulis file JSON
function writeJson(filename: string, data: unknown): void {
  const filePath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// Auth middleware
function authMiddleware(req: any, res: any, next: any): void {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Token required' });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; role: string };
    req.user = decoded;
    next();
  } catch {
    res.status(403).json({ error: 'Invalid token' });
  }
}

// ============ EXPRESS APP ============
const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '10mb' }));

// ============ ROUTES ============

// --- Health Check ---
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ========================
// PUBLIC ROUTES (no auth)
// ========================

// GET /api/docs — list all published docs
app.get('/api/docs', (req, res) => {
  const docs: Doc[] = readJson<Doc[]>('docs.json', []);
  const { category, search } = req.query;

  let result = docs.filter(d => d.published);

  if (category) {
    result = result.filter(d => d.category === category);
  }

  if (search) {
    const q = (search as string).toLowerCase();
    result = result.filter(d =>
      d.title.toLowerCase().includes(q) ||
      d.description.toLowerCase().includes(q)
    );
  }

  // Sort by order
  result.sort((a, b) => a.order - b.order);

  // Return without full content for listing
  res.json(result.map(({ content: _c, ...rest }) => rest));
});

// GET /api/docs/:slug — single doc by slug
app.get('/api/docs/:slug', (req, res) => {
  const docs: Doc[] = readJson<Doc[]>('docs.json', []);
  const doc = docs.find(d => d.slug === req.params.slug && d.published);

  if (!doc) {
    res.status(404).json({ error: 'Doc not found' });
    return;
  }

  res.json(doc);
});

// GET /api/categories — list all categories
app.get('/api/categories', (req, res) => {
  const docs: Doc[] = readJson<Doc[]>('docs.json', []);
  const categories = Array.from(new Set(docs.filter(d => d.published).map(d => d.category)));
  res.json(categories.sort());
});

// GET /api/docs/search?q=keyword — search docs
app.get('/api/docs/search', (req, res) => {
  const docs: Doc[] = readJson<Doc[]>('docs.json', []);
  const q = ((req.query.q as string) || '').toLowerCase();

  if (!q) {
    res.json([]);
    return;
  }

  const results = docs.filter(d =>
    d.published && (
      d.title.toLowerCase().includes(q) ||
      d.description.toLowerCase().includes(q) ||
      d.content.toLowerCase().includes(q)
    )
  );

  res.json(results.map(({ content: _c, ...rest }) => rest));
});

// ========================
// AUTH ROUTES
// ========================

// POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  const users: User[] = readJson<User[]>('users.json', []);

  const user = users.find(u => u.username === username);
  if (!user) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }

  const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: '7d'
  });

  res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
});

// GET /api/auth/me — verify token
app.get('/api/auth/me', authMiddleware, (req, res) => {
  const users: User[] = readJson<User[]>('users.json', []);
  const user = users.find(u => u.id === (req as Request & { user: { userId: string } }).user.userId);

  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  res.json({ id: user.id, username: user.username, role: user.role });
});

// ========================
// ADMIN ROUTES (auth required)
// ========================

// GET /api/admin/docs — list ALL docs (including unpublished)
app.get('/api/admin/docs', authMiddleware, (req, res) => {
  const docs: Doc[] = readJson<Doc[]>('docs.json', []);
  docs.sort((a, b) => a.order - b.order);
  res.json(docs.map(({ content: _c, ...rest }) => rest));
});

// POST /api/admin/docs — create doc
app.post('/api/admin/docs', authMiddleware, (req, res) => {
  const docs: Doc[] = readJson<Doc[]>('docs.json', []);
  const { title, slug, category, content, description, order, published } = req.body;

  // Validasi
  if (!title || !slug || !category || !content) {
    res.status(400).json({ error: 'title, slug, category, content required' });
    return;
  }

  // Cek slug unique
  if (docs.find(d => d.slug === slug)) {
    res.status(409).json({ error: 'Slug already exists' });
    return;
  }

  const newDoc: Doc = {
    id: uuidv4(),
    slug,
    title,
    category,
    content,
    description: description || '',
    order: order ?? 999,
    published: published ?? false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  docs.push(newDoc);
  writeJson('docs.json', docs);

  res.status(201).json({ id: newDoc.id, ...newDoc });
});

// PUT /api/admin/docs/:id — update doc
app.put('/api/admin/docs/:id', authMiddleware, (req, res) => {
  const docs: Doc[] = readJson<Doc[]>('docs.json', []);
  const idx = docs.findIndex(d => d.id === req.params.id);

  if (idx === -1) {
    res.status(404).json({ error: 'Doc not found' });
    return;
  }

  const { title, slug, category, content, description, order, published } = req.body;

  // Cek slug unique (exclude self)
  if (slug && slug !== docs[idx].slug && docs.find(d => d.slug === slug)) {
    res.status(409).json({ error: 'Slug already exists' });
    return;
  }

  docs[idx] = {
    ...docs[idx],
    title: title ?? docs[idx].title,
    slug: slug ?? docs[idx].slug,
    category: category ?? docs[idx].category,
    content: content ?? docs[idx].content,
    description: description ?? docs[idx].description,
    order: order ?? docs[idx].order,
    published: published ?? docs[idx].published,
    updatedAt: new Date().toISOString(),
  };

  writeJson('docs.json', docs);
  res.json({ ...docs[idx] });
});

// DELETE /api/admin/docs/:id — delete doc
app.delete('/api/admin/docs/:id', authMiddleware, (req, res) => {
  const docs: Doc[] = readJson<Doc[]>('docs.json', []);
  const idx = docs.findIndex(d => d.id === req.params.id);

  if (idx === -1) {
    res.status(404).json({ error: 'Doc not found' });
    return;
  }

  docs.splice(idx, 1);
  writeJson('docs.json', docs);

  res.json({ success: true });
});

// PUT /api/admin/docs/:id/publish — toggle publish
app.put('/api/admin/docs/:id/publish', authMiddleware, (req, res) => {
  const docs: Doc[] = readJson<Doc[]>('docs.json', []);
  const idx = docs.findIndex(d => d.id === req.params.id);

  if (idx === -1) {
    res.status(404).json({ error: 'Doc not found' });
    return;
  }

  docs[idx].published = !docs[idx].published;
  docs[idx].updatedAt = new Date().toISOString();
  writeJson('docs.json', docs);

  res.json({ published: docs[idx].published, id: docs[idx].id });
});

// POST /api/admin/users — create user (admin only)
app.post('/api/admin/users', authMiddleware, async (req, res) => {
  const currentUser = (req as Request & { user: { userId: string; role: string } }).user;
  if (currentUser.role !== 'admin') {
    res.status(403).json({ error: 'Admin only' });
    return;
  }

  const users: User[] = readJson<User[]>('users.json', []);
  const { username, password, role } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: 'username and password required' });
    return;
  }

  if (users.find(u => u.username === username)) {
    res.status(409).json({ error: 'Username already exists' });
    return;
  }

  const hash = await bcrypt.hash(password, 10);
  const newUser: User = {
    id: uuidv4(),
    username,
    password: hash,
    role: role || 'editor',
  };

  users.push(newUser);
  writeJson('users.json', users);

  res.status(201).json({ id: newUser.id, username: newUser.username, role: newUser.role });
});

// GET /api/admin/users — list users
app.get('/api/admin/users', authMiddleware, (req, res) => {
  const currentUser = (req as Request & { user: { userId: string; role: string } }).user;
  if (currentUser.role !== 'admin') {
    res.status(403).json({ error: 'Admin only' });
    return;
  }

  const users: User[] = readJson<User[]>('users.json', []);
  res.json(users.map(({ password: _p, ...rest }) => rest));
});

// ============ START ============
app.listen(PORT, () => {
  console.log(`\n docs.siakadku.com Backend`);
  console.log(` Port: ${PORT}`);
  console.log(` Health: http://localhost:${PORT}/health`);
  console.log(` API:    http://localhost:${PORT}/api\n`);
});
