import { useState, useEffect } from 'react';
import { Car, CreateCarData, CarStatus } from '../services/carService';
import './CarModal.scss';

interface CarModalProps {
  car: Car | null;
  onClose: () => void;
  onSave: (data: CreateCarData) => Promise<void>;
}

const CarModal: React.FC<CarModalProps> = ({ car, onClose, onSave }) => {
  const [formData, setFormData] = useState<CreateCarData>({
    modelo: '',
    ano: new Date().getFullYear(),
    cor: '',
    valor: 0,
    status: 'disponivel',
    foto: '',
    allocatedTo: undefined,
  });
  const [fotoPreview, setFotoPreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (car) {
      setFormData({
        modelo: car.modelo,
        ano: car.ano,
        cor: car.cor,
        valor: car.valor,
        status: car.status || 'disponivel',
        foto: car.foto || '',
        allocatedTo: car.allocatedTo?._id as string | undefined,
      });
      setFotoPreview(car.foto || '');
    } else {
      // Resetar formulário quando não há carro para editar
      setFormData({
        modelo: '',
        ano: new Date().getFullYear(),
        cor: '',
        valor: 0,
        status: 'disponivel',
        foto: '',
        allocatedTo: undefined,
      });
      setFotoPreview('');
    }
  }, [car]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Remover allocatedTo se estiver vazio ou undefined
      const dataToSave = { ...formData };
      if (!dataToSave.allocatedTo) {
        delete dataToSave.allocatedTo;
      }
      await onSave(dataToSave);
    } catch (err: any) {
      setError(err.message || 'Erro ao salvar carro');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'valor') {
      // Corrigir bug do zero na frente - remover zeros à esquerda
      const numValue = value.replace(/^0+/, '') || '0';
      setFormData((prev) => ({
        ...prev,
        [name]: Number(numValue),
      }));
    } else if (name === 'foto') {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      setFotoPreview(value);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: name === 'ano' ? Number(value) : value,
      }));
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{car ? 'Editar Carro' : 'Novo Carro'}</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="modelo">Modelo *</label>
            <input
              type="text"
              id="modelo"
              name="modelo"
              value={formData.modelo}
              onChange={handleChange}
              required
              disabled={loading}
              placeholder="Ex: Honda Civic"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="ano">Ano *</label>
              <input
                type="number"
                id="ano"
                name="ano"
                value={formData.ano}
                onChange={handleChange}
                required
                min="1900"
                max={new Date().getFullYear() + 1}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="cor">Cor *</label>
              <input
                type="text"
                id="cor"
                name="cor"
                value={formData.cor}
                onChange={handleChange}
                required
                disabled={loading}
                placeholder="Ex: Branco"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="valor">Valor (R$) *</label>
            <input
              type="number"
              id="valor"
              name="valor"
              value={formData.valor || ''}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              disabled={loading}
              placeholder="0.00"
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Status *</label>
            <select
              id="status"
              name="status"
              value={formData.status || 'disponivel'}
              onChange={handleChange}
              required
              disabled={loading}
            >
              <option value="disponivel">Disponível</option>
              <option value="indisponivel">Indisponível</option>
              <option value="em_uso">Em Uso</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="foto">Foto do Veículo (URL)</label>
            <input
              type="url"
              id="foto"
              name="foto"
              value={formData.foto || ''}
              onChange={handleChange}
              disabled={loading}
              placeholder="https://exemplo.com/foto.jpg"
            />
            {fotoPreview && (
              <div className="foto-preview">
                <img src={fotoPreview} alt="Preview" onError={() => setFotoPreview('')} />
              </div>
            )}
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose} disabled={loading}>
              Cancelar
            </button>
            <button type="submit" className="btn-save" disabled={loading}>
              {loading ? 'Salvando...' : car ? 'Atualizar' : 'Criar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CarModal;

