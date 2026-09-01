import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import incomeRoutes from './routes/income.routes';
import savingRoutes from './routes/saving.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/incomes', incomeRoutes);
app.use('/api/savings', savingRoutes);

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint no encontrado' });
});

export default app;