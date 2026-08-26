import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  db: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    database: process.env.DATABASE_NAME || 'control_gastos',
    user: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'admin',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'admin',
    expiresIn: process.env.JWT_EXPIRES_IN || '20m',
  }
};