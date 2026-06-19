import fs from "fs";
import path from "path";

const schemaSource = path.join("src", "db", "schema.sql");
const schemaTarget = path.join("dist", "db", "schema.sql");

fs.mkdirSync(path.dirname(schemaTarget), { recursive: true });
fs.copyFileSync(schemaSource, schemaTarget);
console.log("Copied schema.sql to dist/db/");
