import { Response } from 'express';
import Car, { CarDocument } from '../models/Car';
import { AuthRequest } from '../middlewares/auth';

export const getCars = async (req: AuthRequest, res: Response) => {
    try {
        let query = {};
        if (!req.user?.admin) {
            query = { createdBy: req.user?._id };
        }
        const cars: CarDocument[] = await Car.find(query).populate('createdBy', 'name email').populate('allocatedTo', 'name email');
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ message: 'Error ao mostrar carros', error });
    };
};

export const getCarById = async (req: AuthRequest, res: Response) => {
    try {
        const car: CarDocument | null = await Car.findById(req.params.id).populate('createdBy', 'name email').populate('allocatedTo', 'name email');
        if (!car) {
            return res.status(404).json({ message: 'Carro não encontrado' });
        };
        if (!req.user?.admin && car.createdBy.toString() !== (req.user?._id as any).toString()) {
            return res.status(403).json({ message: 'Acesso negado' });
        }
        res.status(200).json(car);
    } catch (error) {
        res.status(500).json({ message: 'Error ao mostrar carro', error });
    }
};

export const createCar = async (req: AuthRequest, res: Response) => {
    try {
        const { modelo, ano, cor, valor, allocatedTo } = req.body;
        const newCar: CarDocument = new Car({ modelo, ano, cor, valor, createdBy: req.user?._id, allocatedTo });
        await newCar.save();
        await newCar.populate('createdBy', 'name email');
        await newCar.populate('allocatedTo', 'name email');
        res.status(201).json(newCar);
    } catch (error){
        res.status(500).json({ message: 'Erro ao cadastrar carro' });
    }
};

export const updateCar = async (req: AuthRequest, res: Response) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            return res.status(404).json({ message: 'Carro não encontrado' });
        }
        if (!req.user?.admin && car.createdBy.toString() !== (req.user?._id as any).toString()) {
            return res.status(403).json({ message: 'Acesso negado' });
        }
        const { modelo, ano, cor, valor, allocatedTo } = req.body;
        const updatedCar: CarDocument | null = await Car.findByIdAndUpdate(
            req.params.id,
            { modelo, ano, cor, valor, allocatedTo, updatedAt: new Date() },
            { new: true }
        ).populate('createdBy', 'name email').populate('allocatedTo', 'name email');
        if (!updatedCar) {
            return res.status(404).json({ message: 'Carro não encontrado' });
        }
        res.status(200).json(updatedCar);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar carro', error });
    }
};

export const deleteCar = async (req: AuthRequest, res: Response) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            return res.status(404).json({ message: 'Carro não encontrado' });
        }
        if (!req.user?.admin && car.createdBy.toString() !== (req.user?._id as any).toString()) {
            return res.status(403).json({ message: 'Acesso negado' });
        }
        const deletedCar: CarDocument | null = await Car.findByIdAndDelete(req.params.id);
        if(!deletedCar) {
            return res.status(404).json({ message: 'Carro não encontrado' });
        }
        res.status(200).json({ message: 'Carro deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar carro', error });
    }
};
