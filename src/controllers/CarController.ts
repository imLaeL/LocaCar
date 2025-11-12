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
        const { modelo, ano, cor, valor, status, foto, allocatedTo } = req.body;
        const carData: any = { 
            modelo, 
            ano, 
            cor, 
            valor, 
            status: status || 'disponivel',
            createdBy: req.user?._id 
        };
        if (foto) {
            carData.foto = foto;
        }
        if (allocatedTo) {
            carData.allocatedTo = allocatedTo;
        }
        const newCar: CarDocument = new Car(carData);
        await newCar.save();
        await newCar.populate('createdBy', 'name email');
        if (newCar.allocatedTo) {
            await newCar.populate('allocatedTo', 'name email');
        }
        res.status(201).json(newCar);
    } catch (error: any){
        console.error('Erro ao cadastrar carro:', error);
        res.status(500).json({ message: 'Erro ao cadastrar carro', error: error.message });
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
        const { modelo, ano, cor, valor, status, foto, allocatedTo } = req.body;
        const updateData: any = { modelo, ano, cor, valor, updatedAt: new Date() };
        if (status) {
            updateData.status = status;
        }
        if (foto !== undefined) {
            updateData.foto = foto || null;
        }
        if (allocatedTo !== undefined) {
            updateData.allocatedTo = allocatedTo || null;
        }
        const updatedCar: CarDocument | null = await Car.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        ).populate('createdBy', 'name email');
        if (updatedCar?.allocatedTo) {
            await updatedCar.populate('allocatedTo', 'name email');
        }
        if (!updatedCar) {
            return res.status(404).json({ message: 'Carro não encontrado' });
        }
        res.status(200).json(updatedCar);
    } catch (error: any) {
        console.error('Erro ao atualizar carro:', error);
        res.status(500).json({ message: 'Erro ao atualizar carro', error: error.message });
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
