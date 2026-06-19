CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(200) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(150) UNIQUE NOT NULL,
  name VARCHAR(300) NOT NULL,
  category_slug VARCHAR(100) NOT NULL REFERENCES categories(slug),
  description TEXT NOT NULL,
  origin_country VARCHAR(100) NOT NULL DEFAULT 'Various',
  moq VARCHAR(100) NOT NULL DEFAULT 'Contact for MOQ',
  image VARCHAR(500),
  specifications JSONB DEFAULT '[]',
  documents JSONB DEFAULT '[]',
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS services (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(150) UNIQUE NOT NULL,
  title VARCHAR(300) NOT NULL,
  description TEXT NOT NULL,
  icon VARCHAR(50) NOT NULL DEFAULT 'Ship',
  image VARCHAR(500),
  process_steps JSONB DEFAULT '[]',
  industries_served JSONB DEFAULT '[]',
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(150) UNIQUE NOT NULL,
  title VARCHAR(300) NOT NULL,
  industry VARCHAR(150) NOT NULL,
  description TEXT NOT NULL,
  country VARCHAR(100) NOT NULL DEFAULT 'Ethiopia',
  volume VARCHAR(150),
  logistics_route VARCHAR(300),
  outcome TEXT,
  year VARCHAR(10) NOT NULL,
  image VARCHAR(500),
  content JSONB DEFAULT '[]',
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS news (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(150) UNIQUE NOT NULL,
  title VARCHAR(300) NOT NULL,
  excerpt TEXT NOT NULL,
  content JSONB NOT NULL DEFAULT '[]',
  published_at DATE NOT NULL,
  category VARCHAR(100) NOT NULL,
  image VARCHAR(500),
  author VARCHAR(150) NOT NULL DEFAULT 'Elfakal Communications',
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS certifications (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(150) UNIQUE NOT NULL,
  title VARCHAR(300) NOT NULL,
  description TEXT NOT NULL,
  issuer VARCHAR(200) NOT NULL,
  category VARCHAR(100) NOT NULL,
  document_url VARCHAR(500),
  issued_at DATE,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS inquiries (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  company VARCHAR(200),
  email VARCHAR(200) NOT NULL,
  phone VARCHAR(50),
  country VARCHAR(100),
  industry VARCHAR(150),
  product_interest VARCHAR(300),
  quantity VARCHAR(100),
  message TEXT NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(200) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(200) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'admin',
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_slug);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_news_published ON news(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
