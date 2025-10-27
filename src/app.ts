import express from 'express';
import path from 'path';
import CarRoutes from './routes/CarRoutes';

const app = express();

app.use(express.json());

// Servir arquivos estáticos da pasta public
app.use(express.static(path.join(process.cwd(), 'public')));

app.use('/api/cars', CarRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});

export default app;
