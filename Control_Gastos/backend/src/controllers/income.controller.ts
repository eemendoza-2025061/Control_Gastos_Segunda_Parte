import { Response } from 'express';
import { IncomeService } from '../services/income.service';
import { AuthRequest } from '../middlewares/auth.middleware';

export class IncomeController {
  private incomeService = new IncomeService();

  getAll = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({ success: false, message: 'No autenticado' });
        return;
      }
      const incomes = await this.incomeService.getAll(req.user.id);
      res.status(200).json({ success: true, incomes });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || 'Error interno' });
    }
  };

  getTotal = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({ success: false, message: 'No autenticado' });
        return;
      }
      const data = await this.incomeService.getTotal(req.user.id);
      res.status(200).json({ success: true, ...data });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || 'Error interno' });
    }
  };

  create = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({ success: false, message: 'No autenticado' });
        return;
      }
      const income = await this.incomeService.create(req.user.id, req.body);
      res.status(201).json({ success: true, income });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message || 'Error interno' });
    }
  };

  update = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({ success: false, message: 'No autenticado' });
        return;
      }
      const income = await this.incomeService.update(req.user.id, req.params.id as string, req.body);
      res.status(200).json({ success: true, income });
    } catch (error: any) {
      const status = error.message.includes('no encontrado') ? 404 : 400;
      res.status(status).json({ success: false, message: error.message || 'Error interno' });
    }
  };

  delete = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({ success: false, message: 'No autenticado' });
        return;
      }
      await this.incomeService.delete(req.user.id, req.params.id as string);
      res.status(200).json({ success: true, message: 'Ingreso eliminado' });
    } catch (error: any) {
      const status = error.message.includes('no encontrado') ? 404 : 400;
      res.status(status).json({ success: false, message: error.message || 'Error interno' });
    }
  };
}
