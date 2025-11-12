import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User, { UserDocument } from '../models/User';
import { AuthRequest } from '../middlewares/auth';

export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password, admin } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User({ name, email, password, admin });
        await user.save();

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'k3t1102', { expiresIn: '1h' });

        res.status(201).json({ user: { id: user._id, name: user.name, email: user.email, admin: user.admin }, token });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'k3t1102', { expiresIn: '1h' });

        res.json({ user: { id: user._id, name: user.name, email: user.email, admin: user.admin }, token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};

export const getUsers = async (req: AuthRequest, res: Response) => {
    try {
        const users: UserDocument[] = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};
