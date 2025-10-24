import { Router } from 'express';
import { getCars, getCarById, createCar, updateCar, deleteCar } from '../controllers/CarController';

const router = Router();

router.get('/', getCars);
router.get('/:id', getCarById);
router.post('/', createCar);
router.put('/:id', updateCar);
router.delete('/', deleteCar);

export default router;