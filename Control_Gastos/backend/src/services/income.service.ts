import { Income, IncomeInput } from '../models/income.model';
import { IncomeRepository } from '../repositories/income.repository';

export class IncomeService {
  private incomeRepository = new IncomeRepository();

  async getAll(userId: string): Promise<Income[]> {
    return this.incomeRepository.findAllByUser(userId);
  }

  async getTotal(userId: string): Promise<{ total: number }> {
    const total = await this.incomeRepository.totalIncomes(userId);
    return { total };
  }

  async create(userId: string, data: IncomeInput): Promise<Income> {
    if (!data.descripcion || !data.descripcion.trim()) {
      throw new Error('La descripción es obligatoria');
    }
    if (data.monto == null || isNaN(data.monto) || data.monto < 0) {
      throw new Error('El monto es obligatorio y debe ser mayor o igual a 0');
    }
    if (data.tipo !== 'Fijo' && data.tipo !== 'Variable') {
      throw new Error('El tipo de ingreso debe ser Fijo o Variable');
    }
    return this.incomeRepository.create(userId, {
      descripcion: data.descripcion.trim(),
      monto: data.monto,
      tipo: data.tipo,
      fecha: data.fecha || null
    });
  }

  async update(userId: string, id: string, data: Partial<IncomeInput>): Promise<Income> {
    const income = await this.incomeRepository.findById(id);
    if (!income) throw new Error('Ingreso no encontrado');
    if (income.user_id !== userId) throw new Error('No autorizado para modificar este ingreso');
    const updated = await this.incomeRepository.update(id, data);
    if (!updated) throw new Error('Ingreso no encontrado');
    return updated;
  }

  async delete(userId: string, id: string): Promise<void> {
    const income = await this.incomeRepository.findById(id);
    if (!income) throw new Error('Ingreso no encontrado');
    if (income.user_id !== userId) throw new Error('No autorizado para eliminar este ingreso');
    await this.incomeRepository.delete(id);
  }
}
