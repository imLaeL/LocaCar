import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { carService, Car, CreateCarData } from '../services/carService';
import CarModal from '../components/CarModal';
import './Cars.scss';

const Cars: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadCars();
  }, []);

  const loadCars = async () => {
    try {
      const data = await carService.getAll();
      setCars(data);
    } catch (error) {
      console.error('Error loading cars:', error);
      alert('Erro ao carregar carros');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingCar(null);
    setIsModalOpen(true);
  };

  const handleEdit = (car: Car) => {
    setEditingCar(car);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja excluir este carro?')) {
      return;
    }

    try {
      await carService.delete(id);
      await loadCars();
    } catch (error) {
      console.error('Error deleting car:', error);
      alert('Erro ao excluir carro');
    }
  };

  const handleSave = async (data: CreateCarData) => {
    try {
      if (editingCar) {
        await carService.update(editingCar._id!, data);
      } else {
        await carService.create(data);
      }
      setIsModalOpen(false);
      setEditingCar(null);
      await loadCars();
    } catch (error: any) {
      console.error('Error saving car:', error);
      alert(error.response?.data?.message || 'Erro ao salvar carro');
    }
  };

  const filteredCars = cars.filter((car) =>
    car.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.cor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.ano.toString().includes(searchTerm)
  );

  return (
    <div className="cars-page">
      <Sidebar />
      <div className="cars-content">
        <header className="cars-header">
          <div className="header-top">
            <h1>Carros</h1>
            <button className="btn-primary" onClick={handleCreate}>
              <span>+</span> Adicionar Carro
            </button>
          </div>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Buscar por modelo, cor ou ano..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        <div className="cars-main">
          {loading ? (
            <div className="loading">Carregando...</div>
          ) : filteredCars.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🚗</div>
              <h3>Nenhum carro encontrado</h3>
              <p>{searchTerm ? 'Tente buscar com outros termos' : 'Comece adicionando seu primeiro carro'}</p>
            </div>
          ) : (
            <div className="cars-table-container">
              <table className="cars-table">
                <thead>
                  <tr>
                    <th>Foto</th>
                    <th>Modelo</th>
                    <th>Ano</th>
                    <th>Cor</th>
                    <th>Valor</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCars.map((car) => (
                    <tr key={car._id}>
                      <td>
                        {car.foto ? (
                          <img src={car.foto} alt={car.modelo} className="car-photo" />
                        ) : (
                          <div className="car-photo-placeholder">🚗</div>
                        )}
                      </td>
                      <td>
                        <div className="car-model">{car.modelo}</div>
                      </td>
                      <td>{car.ano}</td>
                      <td>
                        <span className="color-badge" style={{ backgroundColor: car.cor.toLowerCase() }}>
                          {car.cor}
                        </span>
                      </td>
                      <td>
                        <span className="value-text">
                          R$ {car.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                      </td>
                      <td>
                        <span className={`status-badge status-${car.status || 'disponivel'}`}>
                          {car.status === 'disponivel' ? 'Disponível' : 
                           car.status === 'indisponivel' ? 'Indisponível' : 
                           car.status === 'em_uso' ? 'Em Uso' : 'Disponível'}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="btn-action btn-edit"
                            onClick={() => handleEdit(car)}
                            title="Editar"
                          >
                            ✏️
                          </button>
                          <button
                            className="btn-action btn-delete"
                            onClick={() => handleDelete(car._id!)}
                            title="Excluir"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <CarModal
          car={editingCar}
          onClose={() => {
            setIsModalOpen(false);
            setEditingCar(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Cars;

