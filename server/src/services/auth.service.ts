import bcrypt from "bcryptjs";
import jwt, { type JwtPayload, type SignOptions } from "jsonwebtoken";
import { config } from "../config/index.js";
import { isDatabaseReady, query } from "../db/pool.js";
import {
  mapUser,
  toSafeUser,
  type SafeUser,
  type UserRow,
} from "../models/user.js";

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function findUserByEmail(
  email: string
): Promise<UserRow | null> {
  if (!(await isDatabaseReady())) return null;

  const rows = await query<UserRow>(
    `SELECT * FROM users WHERE email = $1 AND active = TRUE`,
    [email.toLowerCase()]
  );
  return rows[0] || null;
}

export async function findUserById(id: number): Promise<UserRow | null> {
  if (!(await isDatabaseReady())) return null;

  const rows = await query<UserRow>(
    `SELECT * FROM users WHERE id = $1 AND active = TRUE`,
    [id]
  );
  return rows[0] || null;
}

export function signToken(user: SafeUser): string {
  const options: SignOptions = {
    expiresIn: config.jwtExpiresIn as SignOptions["expiresIn"],
  };
  return jwt.sign(
    { sub: user.id, email: user.email, role: user.role },
    config.jwtSecret,
    options
  );
}

export function verifyToken(token: string): {
  sub: number;
  email: string;
  role: string;
} {
  const payload = jwt.verify(token, config.jwtSecret) as JwtPayload;
  return {
    sub: Number(payload.sub),
    email: String(payload.email ?? ""),
    role: String(payload.role ?? ""),
  };
}

export async function login(
  email: string,
  password: string
): Promise<{ user: SafeUser; token: string } | null> {
  const row = await findUserByEmail(email);
  if (!row) return null;

  const valid = await verifyPassword(password, row.password_hash);
  if (!valid) return null;

  const user = toSafeUser(row);
  const token = signToken(user);
  return { user, token };
}

export async function seedAdminUser(): Promise<void> {
  if (!(await isDatabaseReady())) {
    console.warn("Database not ready — skipping admin seed");
    return;
  }

  const passwordHash = await hashPassword(config.adminPassword);

  await query(
    `INSERT INTO users (email, password_hash, name, role, active)
     VALUES ($1, $2, $3, 'admin', TRUE)
     ON CONFLICT (email) DO UPDATE SET
       password_hash = EXCLUDED.password_hash,
       name = EXCLUDED.name,
       role = EXCLUDED.role,
       active = TRUE,
       updated_at = NOW()`,
    [config.adminEmail.toLowerCase(), passwordHash, config.adminName]
  );

  console.log(`Admin user seeded: ${config.adminEmail}`);
}
