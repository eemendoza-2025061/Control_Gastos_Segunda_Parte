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
