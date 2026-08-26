import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.middleware';

export const requireRole = (role: 'admin' | 'user') => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'No autenticado' });
      return;
    }
    if (req.user.role !== role) {
      res.status(403).json({ success: false, message: 'Acceso denegado: Permisos insuficientes' });
      return;
    }
    next();
  };
};