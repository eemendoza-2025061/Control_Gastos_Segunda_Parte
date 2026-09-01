import { Router } from 'express';
import { IncomeController } from '../controllers/income.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const router = Router();
const incomeController = new IncomeController();

router.get('/', authenticateJWT, incomeController.getAll);
router.get('/total', authenticateJWT, incomeController.getTotal);
router.post('/', authenticateJWT, incomeController.create);
router.put('/:id', authenticateJWT, incomeController.update);
router.delete('/:id', authenticateJWT, incomeController.delete);

export default router;
