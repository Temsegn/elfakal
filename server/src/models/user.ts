export type UserRole = "admin" | "editor";

export type User = {
  id: number;
  email: string;
  passwordHash: string;
  name: string;
  role: UserRole;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

export type SafeUser = Pick<User, "id" | "email" | "name" | "role">;

export type UserRow = {
  id: number;
  email: string;
  password_hash: string;
  name: string;
  role: UserRole;
  active: boolean;
  created_at: string;
  updated_at: string;
};

export function toSafeUser(row: UserRow): SafeUser {
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    role: row.role,
  };
}

export function mapUser(row: UserRow): User {
  return {
    id: row.id,
    email: row.email,
    passwordHash: row.password_hash,
    name: row.name,
    role: row.role,
    active: row.active,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
