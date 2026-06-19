import { setupDatabase } from "./setup.js";
import { seedDatabase } from "../services/content.service.js";
import { seedAdminUser } from "../services/auth.service.js";
import { config } from "../config/index.js";

await setupDatabase();
await seedDatabase();
await seedAdminUser();

console.log("Seed complete");
console.log("--- Admin credentials ---");
console.log(`Email:    ${config.adminEmail}`);
console.log(`Password: ${config.adminPassword}`);
console.log("Login:    POST /api/v1/auth/login");
