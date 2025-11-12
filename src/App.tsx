import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Cars from './pages/Cars';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/cars"
              element={
                <PrivateRoute>
                  <Cars />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
          <footer style={{ textAlign: 'center', padding: '20px', backgroundColor: '#1a1a1a', color: '#fff' }}>
            {'Desenvolvido por -> João Valdivino e Isaque Lael'}
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

