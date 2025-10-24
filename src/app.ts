import express from 'express';
import CarRoutes from './routes/CarRoutes';

const app = express();

app.use(express.json());

app.use('/api/cars', CarRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Car API');
});

export default app;