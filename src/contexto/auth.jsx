import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const AuthContext = createContext({});


// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const navigate = useNavigate()

    const [user, setUser] = useState()

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const recoveredUser = localStorage.getItem("safehostel:user")

        if (recoveredUser) {
            setUser(JSON.stringify(recoveredUser))
        }

        setLoading(false)
    }, []);


    const login = async ({ cpf, senha }) => {
        try {
            console.log("Caiu Login")
            const resposta = await axios.post(
                'https://localhost:7196/api/Autenticacao/autenticar', {
                Login: cpf,
                Senha: senha
            });

            console.log("Login resposta: ", resposta.data)

            if (resposta.status == 200) {
                console.log("Login sucesso")

                setUser(JSON.stringify(resposta.data))

                localStorage.setItem("safehostel:user", JSON.stringify(user))

                navigate("/")
            }
        }
        catch (err) {
            const message = err.response.data.message
            toast.error(message)
        }
    }

    const logout = () => {
        console.log("Caiu Logout")

        localStorage.removeItem("safehostel:user")
        setUser(null)

        console.log("User Logout: ", user)
        navigate("/login")
    };

    useEffect(() => {
        const clearStorage = () => {
            try {
                logout();
            } catch (error) {
                // eslint-disable-next-line no-console
                console.log(error);
            }
        };

        const id = setInterval(() => {
            clearStorage();
        }, 43200000);

        return () => clearInterval(id);
    }, [logout]);

    return (
        <>
            <ToastContainer position="top-right" />
            <AuthContext.Provider value={{ authenticated: !!user, user, loading, login, logout }}>
                {children}
            </AuthContext.Provider>
        </>
    )
}