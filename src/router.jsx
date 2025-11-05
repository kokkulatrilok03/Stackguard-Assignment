import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App.jsx';
import AuthPage from './pages/AuthPage.jsx';
import ConfigPage from './pages/ConfigPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import { useAuthStore } from './store/useAuthStore.js';

const ProtectedRoute = ({ children }) => {
  const user = useAuthStore((s) => s.user);
  if (!user) return <Navigate to="/auth" replace />;
  return children;
};

const PrivateRoute = ({ children }) => {
  const configKey = useAuthStore((s) => s.configKey);
  if (!configKey) return <Navigate to="/config" replace />;
  return children;
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Navigate to="/auth" replace /> },
      { path: 'auth', element: <AuthPage /> },
      {
        path: 'config',
        element: (
          <ProtectedRoute>
            <ConfigPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'dashboard',
        element: (
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        ),
      },
      { path: '*', element: <Navigate to="/auth" replace /> },
    ],
  },
]);

export default router;


