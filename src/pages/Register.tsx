import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Register.scss';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    address: '',
    cpf: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Validação de CPF (apenas números)
    if (name === 'cpf') {
      const numbersOnly = value.replace(/\D/g, '');
      if (numbersOnly.length <= 11) {
        setFormData(prev => ({ ...prev, [name]: numbersOnly }));
      }
      return;
    }
    
    // Validação de idade (apenas números)
    if (name === 'age') {
      const numbersOnly = value.replace(/\D/g, '');
      if (numbersOnly.length <= 3) {
        setFormData(prev => ({ ...prev, [name]: numbersOnly }));
      }
      return;
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const formatCPF = (cpf: string) => {
    const numbers = cpf.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return cpf;
  };

  const validateEmail = (email: string) => {
    return email.endsWith('@locacar.com');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validações
    if (!formData.name.trim()) {
      setError('Nome é obrigatório');
      return;
    }

    if (!formData.age || parseInt(formData.age) < 18) {
      setError('Idade deve ser maior ou igual a 18 anos');
      return;
    }

    if (!formData.address.trim()) {
      setError('Endereço é obrigatório');
      return;
    }

    if (formData.cpf.length !== 11) {
      setError('CPF deve ter 11 dígitos');
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Email deve terminar com @locacar.com');
      return;
    }

    if (formData.password.length < 6) {
      setError('Senha deve ter no mínimo 6 caracteres');
      return;
    }

    setLoading(true);

    // Simulação de cadastro (fictício, apenas frontend)
    setTimeout(() => {
      setLoading(false);
      alert('Cadastro realizado com sucesso! (Apenas simulação - frontend)');
      navigate('/login');
    }, 1500);
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-illustration">
          <div className="illustration-content">
            <h1 className="welcome-text">
              <span className="text-line">Crie sua conta</span>
              <span className="text-line">E faça parte do LocaCar</span>
            </h1>
            <div className="illustration-graphic">
              <div className="car-illustration">
                <div className="car-body">
                  <div className="car-window"></div>
                  <div className="car-wheel car-wheel-front"></div>
                  <div className="car-wheel car-wheel-back"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="register-form-container">
          <form className="register-form" onSubmit={handleSubmit}>
            <h2 className="form-title">CADASTRO</h2>
            
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label htmlFor="name">Nome Completo *</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Digite seu nome completo"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="age">Idade *</label>
                <input
                  type="text"
                  id="age"
                  name="age"
                  placeholder="18"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="cpf">CPF *</label>
                <input
                  type="text"
                  id="cpf"
                  name="cpf"
                  placeholder="000.000.000-00"
                  value={formatCPF(formData.cpf)}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  maxLength={14}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="address">Endereço *</label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Rua, número, bairro, cidade"
                value={formData.address}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="seuemail@locacar.com"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
              />
              <small className="form-hint">Email deve terminar com @locacar.com</small>
            </div>

            <div className="form-group">
              <label htmlFor="password">Senha *</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Mínimo 6 caracteres"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading}
                minLength={6}
              />
            </div>

            <div className="form-footer">
              <p>
                Já tem uma conta? <Link to="/login">Faça login</Link>
              </p>
            </div>

            <button type="submit" className="register-button" disabled={loading}>
              {loading ? 'CADASTRANDO...' : 'CADASTRAR'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

