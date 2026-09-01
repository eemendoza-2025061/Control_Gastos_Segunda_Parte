import { Router } from 'express';
import { SavingController } from '../controllers/saving.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const router = Router();
const savingController = new SavingController();

router.get('/', authenticateJWT, savingController.getAll);
router.get('/summary', authenticateJWT, savingController.getSummary);
router.post('/', authenticateJWT, savingController.create);
router.post('/meta', authenticateJWT, savingController.setGoal);
router.delete('/:id', authenticateJWT, savingController.delete);

export default router;
