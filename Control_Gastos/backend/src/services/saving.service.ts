import { Saving, SavingInput } from '../models/saving.model';
import { SavingRepository } from '../repositories/saving.repository';

export class SavingService {
  private savingRepository = new SavingRepository();

  async getAll(userId: string): Promise<Saving[]> {
    return this.savingRepository.findAllByUser(userId);
  }

  async getSummary(userId: string): Promise<{ total: number; meta: number; progreso: number }> {
    const total = await this.savingRepository.totalSavings(userId);
    const goal = await this.savingRepository.getGoal(userId);
    const meta = goal?.meta ?? 0;
    const progreso = meta > 0 ? Math.min(100, Math.round((total / meta) * 100)) : 0;
    return { total, meta, progreso };
  }

  async create(userId: string, data: SavingInput): Promise<Saving> {
    if (data.monto == null || isNaN(data.monto) || data.monto < 0) {
      throw new Error('El monto es obligatorio y debe ser mayor o igual a 0');
    }
    return this.savingRepository.create(userId, {
      monto: data.monto,
      descripcion: data.descripcion?.trim() || null
    });
  }

  async setGoal(userId: string, meta: number): Promise<{ meta: number }> {
    if (meta == null || isNaN(meta) || meta < 0) {
      throw new Error('La meta debe ser un número mayor o igual a 0');
    }
    const goal = await this.savingRepository.setGoal(userId, meta);
    return { meta: Number(goal.meta) };
  }

  async delete(userId: string, id: string): Promise<void> {
    const saving = await this.savingRepository.findById(id);
    if (!saving) throw new Error('Ahorro no encontrado');
    if (saving.user_id !== userId) throw new Error('No autorizado para eliminar este ahorro');
    await this.savingRepository.delete(id);
  }
}
