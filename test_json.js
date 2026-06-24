const fs = require("fs");
const d = JSON.parse(fs.readFileSync("/www/docs.siakadku.com/backend/data/docs.json", "utf-8"));
console.log("Top keys:", Object.keys(d));
console.log("Is array:", Array.isArray(d));
if (typeof d === "object") {
  const keys = Object.keys(d);
  console.log("First key values:", keys.map(function(k){ return k + "=" + (Array.isArray(d[k]) ? "Array(" + d[k].length + ")" : typeof d[k]); }));
}
