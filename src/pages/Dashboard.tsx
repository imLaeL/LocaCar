import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { carService, Car } from '../services/carService';
import './Dashboard.scss';

const Dashboard: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCars: 0,
    totalValue: 0,
    availableCars: 0,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await carService.getAll();
      setCars(data);
      
      const totalValue = data.reduce((sum, car) => sum + car.valor, 0);
      const availableCars = data.filter(car => !car.allocatedTo).length;
      
      setStats({
        totalCars: data.length,
        totalValue,
        availableCars,
      });
    } catch (error) {
      console.error('Error loading cars:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <header className="dashboard-header">
          <h1>Dashboard</h1>
        </header>

        <div className="dashboard-main">
          {loading ? (
            <div className="loading">Carregando...</div>
          ) : (
            <>
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-header">
                    <h3>Total de Carros</h3>
                  </div>
                  <div className="stat-value">{stats.totalCars}</div>
                  <div className="stat-detail">Disponíveis: {stats.availableCars}</div>
                  <div className="stat-trend positive">
                    <span>📈</span>
                    <span>+{stats.availableCars}</span>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-header">
                    <h3>Valor Total</h3>
                  </div>
                  <div className="stat-value">
                    R$ {stats.totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="stat-detail">Patrimônio da frota</div>
                  <div className="stat-trend positive">
                    <span>💰</span>
                    <span>Ativo</span>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-header">
                    <h3>Carros Alocados</h3>
                  </div>
                  <div className="stat-value">{stats.totalCars - stats.availableCars}</div>
                  <div className="stat-detail">Em uso</div>
                  <div className="stat-trend neutral">
                    <span>🚗</span>
                    <span>{((stats.totalCars - stats.availableCars) / stats.totalCars * 100 || 0).toFixed(0)}%</span>
                  </div>
                </div>
              </div>

              <div className="recent-section">
                <h2>Carros Recentes</h2>
                <div className="cars-grid">
                  {cars.slice(0, 6).map((car) => (
                    <div key={car._id} className="car-card">
                      <div className="car-header">
                        <h3>{car.modelo}</h3>
                        <span className={`car-status ${car.allocatedTo ? 'allocated' : 'available'}`}>
                          {car.allocatedTo ? 'Alocado' : 'Disponível'}
                        </span>
                      </div>
                      <div className="car-details">
                        <div className="car-detail-item">
                          <span className="label">Ano:</span>
                          <span className="value">{car.ano}</span>
                        </div>
                        <div className="car-detail-item">
                          <span className="label">Cor:</span>
                          <span className="value">{car.cor}</span>
                        </div>
                        <div className="car-detail-item">
                          <span className="label">Valor:</span>
                          <span className="value">R$ {car.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

