import express from 'express';
import CarRoutes from './routes/CarRoutes';
import UserRoutes from './routes/UserRoutes';

const app = express();

app.use(express.json());

app.use('/api/cars', CarRoutes);
app.use('/api/users', UserRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Car API');
});

export default app;
