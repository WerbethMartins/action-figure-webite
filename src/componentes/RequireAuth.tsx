import type { JSX } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

export function RequireAuth({ children }: { children: JSX.Element }) {
    const { usuario, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div>Carregando autorização...</div>;
    }

    if (!usuario) {
        return <Navigate to="/entrar" state={{ from: location }} replace />;
    }

    return children;
}
