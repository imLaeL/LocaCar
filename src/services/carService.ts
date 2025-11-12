import api from './api';

export type CarStatus = 'disponivel' | 'indisponivel' | 'em_uso';

export interface Car {
  _id?: string;
  modelo: string;
  ano: number;
  cor: string;
  valor: number;
  status: CarStatus;
  foto?: string;
  createdBy?: {
    _id: string;
    name: string;
    email: string;
  };
  allocatedTo?: {
    _id: string;
    name: string;
    email: string;
  } | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateCarData {
  modelo: string;
  ano: number;
  cor: string;
  valor: number;
  status?: CarStatus;
  foto?: string;
  allocatedTo?: string;
}

export const carService = {
  getAll: async (): Promise<Car[]> => {
    const response = await api.get<Car[]>('/cars');
    return response.data;
  },

  getById: async (id: string): Promise<Car> => {
    const response = await api.get<Car>(`/cars/${id}`);
    return response.data;
  },

  create: async (data: CreateCarData): Promise<Car> => {
    const response = await api.post<Car>('/cars', data);
    return response.data;
  },

  update: async (id: string, data: Partial<CreateCarData>): Promise<Car> => {
    const response = await api.put<Car>(`/cars/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/cars/${id}`);
  },
};

