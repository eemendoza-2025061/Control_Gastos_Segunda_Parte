import { pool } from '../config/database';
import { Income, IncomeInput } from '../models/income.model';

export class IncomeRepository {
  async findAllByUser(userId: string): Promise<Income[]> {
    const query = 'SELECT * FROM incomes WHERE user_id = $1 ORDER BY created_at DESC';
    const result = await pool.query(query, [userId]);
    return result.rows;
  }

  async findById(id: string): Promise<Income | null> {
    const query = 'SELECT * FROM incomes WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }

  async create(userId: string, data: IncomeInput): Promise<Income> {
    const query = `
      INSERT INTO incomes (user_id, descripcion, monto, tipo, fecha)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const values = [userId, data.descripcion, data.monto, data.tipo, data.fecha || null];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async update(id: string, data: Partial<IncomeInput>): Promise<Income | null> {
    const current = await this.findById(id);
    if (!current) return null;
    const descripcion = data.descripcion ?? current.descripcion;
    const monto = data.monto ?? current.monto;
    const tipo = data.tipo ?? current.tipo;
    const fecha = data.fecha !== undefined ? data.fecha : current.fecha;
    const query = `
      UPDATE incomes
      SET descripcion = $1, monto = $2, tipo = $3, fecha = $4
      WHERE id = $5
      RETURNING *
    `;
    const result = await pool.query(query, [descripcion, monto, tipo, fecha, id]);
    return result.rows[0] || null;
  }

  async delete(id: string): Promise<boolean> {
    const query = 'DELETE FROM incomes WHERE id = $1';
    const result = await pool.query(query, [id]);
    return (result.rowCount ?? 0) > 0;
  }

  async totalIncomes(userId: string): Promise<number> {
    const query = 'SELECT COALESCE(SUM(monto), 0)::float as total FROM incomes WHERE user_id = $1';
    const result = await pool.query(query, [userId]);
    return Number(result.rows[0]?.total) || 0;
  }
}
