import { pool } from '../config/database';
import { User } from '../models/user.model';

export class UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0] || null;
  }

  async findById(id: string): Promise<User | null> {
    const query = 'SELECT id, name, email, role, created_at, updated_at FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }
}