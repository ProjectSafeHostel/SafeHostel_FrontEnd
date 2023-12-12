import { Navigate, Route, Routes } from 'react-router-dom'
import { Doacoes } from '../components/produto/doacao_tabela';
import { Doador } from '../pages/doador';
import { Estoque } from '../pages/estoque';
import { LogIn } from '../components/login/log_in';
import { Home } from '../pages/home';
import { Cliente } from '../pages/cliente';
import { DefaultLayout } from '../layout/layout';
import { Cadastrar } from '../components/login/registrar';
import { AuthContext, AuthProvider } from '../contexto/auth';
import { useContext } from 'react';

export function AppRoutes() {

    // eslint-disable-next-line react/prop-types
    const Private = ({ children }) => {
        const { authenticated, loading } = useContext(AuthContext)
        console.log("authenticated: ", authenticated)

        if (loading) {
            return <div className='loading'>Carregando...</div>
        }

        if (!authenticated) {
            return <Navigate to="/login" />
        }

        return children
    }

    return (
        <AuthProvider>
            <Routes>
                <Route path="/login" element={<LogIn />} />
                <Route path="/cadastrar_usuario" element={<Cadastrar />} />
                <Route path='/' element={<DefaultLayout />}>
                    <Route path="/" element={<Private><Home /></Private>} />
                    <Route path="/doador" element={<Private><Doador /></Private>} />
                    <Route path="/cliente" element={<Private><Cliente /></Private>} />
                    <Route path="/estoque" element={<Private><Estoque /></Private>} />
                    <Route path="/doacao" element={<Private><Doacoes /></Private>} />
                </Route>
            </Routes>
        </AuthProvider>
    )
}