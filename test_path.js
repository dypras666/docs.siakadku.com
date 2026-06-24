process.chdir("/www/docs.siakadku.com");
const fs = require("fs");
const path = require("path");
const jsonPath = path.join(process.cwd(), "backend", "data", "docs.json");
console.log("CWD:", process.cwd());
console.log("JSON Path:", jsonPath);
console.log("Exists:", fs.existsSync(jsonPath));
try {
  const d = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
  console.log("Docs count:", d.data ? d.data.length : 0);
  console.log("Slugs:", d.data ? d.data.map(function(x){return x.slug}) : []);
} catch(e) {
  console.log("Error:", e.message);
}
