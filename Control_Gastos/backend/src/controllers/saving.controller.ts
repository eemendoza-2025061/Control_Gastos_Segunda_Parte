import { Response } from 'express';
import { SavingService } from '../services/saving.service';
import { AuthRequest } from '../middlewares/auth.middleware';

export class SavingController {
  private savingService = new SavingService();

  getAll = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({ success: false, message: 'No autenticado' });
        return;
      }
      const savings = await this.savingService.getAll(req.user.id);
      res.status(200).json({ success: true, savings });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || 'Error interno' });
    }
  };

  getSummary = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({ success: false, message: 'No autenticado' });
        return;
      }
      const summary = await this.savingService.getSummary(req.user.id);
      res.status(200).json({ success: true, ...summary });
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
      const saving = await this.savingService.create(req.user.id, req.body);
      res.status(201).json({ success: true, saving });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message || 'Error interno' });
    }
  };

  setGoal = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({ success: false, message: 'No autenticado' });
        return;
      }
      const result = await this.savingService.setGoal(req.user.id, Number(req.body.meta));
      res.status(200).json({ success: true, ...result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message || 'Error interno' });
    }
  };

  delete = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({ success: false, message: 'No autenticado' });
        return;
      }
      await this.savingService.delete(req.user.id, req.params.id as string);
      res.status(200).json({ success: true, message: 'Ahorro eliminado' });
    } catch (error: any) {
      const status = error.message.includes('no encontrado') ? 404 : 400;
      res.status(status).json({ success: false, message: error.message || 'Error interno' });
    }
  };
}
