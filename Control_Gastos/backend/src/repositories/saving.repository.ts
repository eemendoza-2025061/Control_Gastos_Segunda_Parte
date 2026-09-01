import { pool } from '../config/database';
import { Saving, SavingInput, SavingGoal } from '../models/saving.model';

export class SavingRepository {
  async findAllByUser(userId: string): Promise<Saving[]> {
    const query = 'SELECT * FROM savings WHERE user_id = $1 ORDER BY created_at DESC';
    const result = await pool.query(query, [userId]);
    return result.rows;
  }

  async totalSavings(userId: string): Promise<number> {
    const query = 'SELECT COALESCE(SUM(monto), 0)::float as total FROM savings WHERE user_id = $1';
    const result = await pool.query(query, [userId]);
    return Number(result.rows[0]?.total) || 0;
  }

  async create(userId: string, data: SavingInput): Promise<Saving> {
    const query = `
      INSERT INTO savings (user_id, descripcion, monto)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const result = await pool.query(query, [userId, data.descripcion || null, data.monto]);
    return result.rows[0];
  }

  async delete(id: string): Promise<boolean> {
    const query = 'DELETE FROM savings WHERE id = $1';
    const result = await pool.query(query, [id]);
    return (result.rowCount ?? 0) > 0;
  }

  async findById(id: string): Promise<Saving | null> {
    const query = 'SELECT * FROM savings WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }

  async getGoal(userId: string): Promise<SavingGoal | null> {
    const query = 'SELECT * FROM savings_goals WHERE user_id = $1';
    const result = await pool.query(query, [userId]);
    return result.rows[0] || null;
  }

  async setGoal(userId: string, meta: number): Promise<SavingGoal> {
    const query = `
      INSERT INTO savings_goals (user_id, meta)
      VALUES ($1, $2)
      ON CONFLICT (user_id)
      DO UPDATE SET meta = EXCLUDED.meta, updated_at = CURRENT_TIMESTAMP
      RETURNING *
    `;
    const result = await pool.query(query, [userId, meta]);
    return result.rows[0];
  }
}
