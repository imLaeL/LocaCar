import { Request, Response } from 'express';
import Car, { CarDocument } from '../models/Car';

export const getCars = async (req: Request, res: Response) => {
    try {
        const cars: CarDocument[] = await Car.find();
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ message: 'Error ao mostrar carros', error });
    };
};

export const getCarById = async (req: Request, res: Response) => {
    try {
        const car: CarDocument | null = await Car.findById(req.params.id); if (!car) {
            return res.status(404).json({ message: 'Carro não encontrado' });
        };
        res.status(200).json(car);
    } catch (error) {
        res.status(500).json({ message: 'Error ao mostrar carro', error });
    }
};

export const createCar = async (req: Request, res: Response) => {
    try {
        const { modelo, ano, cor, valor } = req.body;
        const newCar: CarDocument = new Car({ modelo, ano, cor, valor });
        await newCar.save();
        res.status(201).json(newCar);
    } catch (error){
        res.status(500).json({ message: 'Erro ao cadastrar carro' });
    }
};

export const updateCar = async (req: Request, res: Response) => {
    try {
        const { modelo, ano, cor, valor } = req.body;
        const updatedCar: CarDocument | null = await Car.findByIdAndUpdate(
            req.params.id,
            { modelo, ano, cor, valor, updatedAt: new Date() },
            { new: true }
        );
        if (!updatedCar) {
            return res.status(404).json({ message: 'Carro não encontrado' });
        }
        res.status(200).json(updatedCar);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar carro', error });
    }
};

export const deleteCar = async (req: Request, res: Response) => {
    try {
        const deletedCar: CarDocument | null = await Car.findByIdAndDelete(req.params.id);
        if(!deletedCar) {
            return res.status(404).json({ message: 'Carro não encontrado' });
        }
        res.status(200).json({ message: 'Carro deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar carro', error });
    }
};
