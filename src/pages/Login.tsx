import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Login.scss';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate('/dashboard');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-illustration">
          <div className="illustration-content">
            <h1 className="welcome-text">
              <span className="text-line">Faça login</span>
              <span className="text-line">E entre para o nosso time</span>
            </h1>
            <div className="illustration-graphic">
              <div className="car-illustration">
                <div className="car-body">
                  <div className="car-window"></div>
                  <div className="car-wheel car-wheel-front"></div>
                  <div className="car-wheel car-wheel-back"></div>
                </div>
              </div>
              <div className="computer-screen">
                <div className="screen-content">
                  <div className="screen-line"></div>
                  <div className="screen-line"></div>
                  <div className="screen-cursor">_</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="login-form-container">
          <form className="login-form" onSubmit={handleSubmit}>
            <h2 className="form-title">LOGIN</h2>
            
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label htmlFor="email">Usuário</label>
              <input
                type="email"
                id="email"
                placeholder="Usuário"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                id="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="form-footer">
              <a href="#" className="forgot-password">Recuperar senha?</a>
              <p>
                Não tem uma conta? <Link to="/register">Cadastre-se</Link>
              </p>
            </div>

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? 'ENTRANDO...' : 'LOGIN'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

