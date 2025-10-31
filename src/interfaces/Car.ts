import { Types } from 'mongoose';

export interface ICar {
    modelo: string;
    ano: number;
    cor: string;
    valor: number;
    createdBy: Types.ObjectId;
    allocatedTo?: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
