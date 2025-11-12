import express from 'express';
import path from 'path';
import cors from 'cors';
import CarRoutes from './routes/CarRoutes';
import UserRoutes from './routes/UserRoutes';

const app = express();

// Configurar CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());

// Rota de status da API
app.get('/api', (req, res) => {
  res.json({ message: 'API funcionando' });
});

// Servir arquivos estáticos da pasta public
app.use(express.static(path.join(process.cwd(), 'public')));

app.use('/api/cars', CarRoutes);
app.use('/api/users', UserRoutes);

// Rota catch-all: serve o index.html para todas as rotas não-API
// Deve ser a última rota registrada
app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});

export default app;
