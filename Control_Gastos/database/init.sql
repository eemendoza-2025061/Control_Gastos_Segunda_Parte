CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email, password, role) VALUES
('Administrador', 'admin@example.com', '$2b$10$JJoFh2gmOK2QV/OeBf4uq.Z..c4HPr0xBE7rHyWflz3OA19TW.N9O', 'admin'),
('Usuario', 'user@example.com', '$2b$10$JJoFh2gmOK2QV/OeBf4uq.Z..c4HPr0xBE7rHyWflz3OA19TW.N9O', 'user')
ON CONFLICT (email) DO NOTHING;

-- Ingresos
CREATE TABLE IF NOT EXISTS incomes (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  descripcion VARCHAR(255) NOT NULL,
  monto NUMERIC(12,2) NOT NULL DEFAULT 0,
  tipo VARCHAR(20) NOT NULL DEFAULT 'Fijo',
  fecha DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_incomes_user ON incomes(user_id);

-- Ahorros
CREATE TABLE IF NOT EXISTS savings (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  descripcion VARCHAR(255),
  monto NUMERIC(12,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_savings_user ON savings(user_id);

-- Meta de ahorro mensual (una por usuario)
CREATE TABLE IF NOT EXISTS savings_goals (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  meta NUMERIC(12,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
