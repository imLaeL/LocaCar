import { Types } from 'mongoose';

export type CarStatus = 'disponivel' | 'indisponivel' | 'em_uso';

export interface ICar {
    modelo: string;
    ano: number;
    cor: string;
    valor: number;
    status: CarStatus;
    foto?: string;
    createdBy: Types.ObjectId;
    allocatedTo?: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
