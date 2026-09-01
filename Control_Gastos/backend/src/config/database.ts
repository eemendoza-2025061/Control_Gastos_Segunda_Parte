import { Pool, types } from 'pg';
import { config } from './env';

types.setTypeParser(1700, (val) => parseFloat(val));

export const pool = new Pool({
  host: config.db.host,
  port: config.db.port,
  database: config.db.database,
  user: config.db.user,
  password: config.db.password,
});

pool.on('error', (err) => {
  console.error('Error inesperado de PostgreSQL', err);
  process.exit(-1);
});