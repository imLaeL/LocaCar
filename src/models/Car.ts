import { Schema, model, Document } from 'mongoose';
import { ICar } from '../interfaces/Car';

export interface CarDocument extends ICar, Document {}

const CarSchema = new Schema<CarDocument>({
    modelo: {
        type: String,
        required: true,
        trim: true,
    },
    ano: {
        type: Number,
        required: true,
        trim: true,
    },
    cor: {
        type: String,
        required: true,
        trim: true,
    },
    valor: {
        type: Number,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

CarSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

const Car = model<CarDocument>('Car', CarSchema);

export default Car;