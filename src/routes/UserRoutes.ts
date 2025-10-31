import { Router } from 'express';
import { register, login, getUsers } from '../controllers/UserController';
import { authenticateToken, requireAdmin } from '../middlewares/auth';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/', authenticateToken, requireAdmin, getUsers);

export default router;
