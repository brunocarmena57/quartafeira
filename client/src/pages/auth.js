import { useState } from "react";
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom'

// Definição do componente que tem o login e o registro
export const Auth = () => {
    
    return (
    <div className="auth">
        <Login />
        <Register />
        </div>
    );
};

// Utilizado para renderizar o formulário de login
const Login = () => {
    // Estado inicial dos campos
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    // Define variável para acessar hook useCookies
    const [_, setCookies] = useCookies(["access_token"])

    const navigate = useNavigate()

    // Executada quando o usuário clica no botão de login
    const onSubmit =  async (event) => {
        event.preventDefault();
        try {
            // Solicitação HTTP POST
            const response = await axios.post("http://localhost:3002/auth/login", {
                username,
                password,
            });

            // Define o cookie
            setCookies("access_token", response.data.token);
            // Armazena o ID do usuário no local storage
            window.localStorage.setItem("userID", response.data.userID); 
            navigate("/");
        }catch (err) {
            console.error(err)
        }
    }
    return (
        <Form username={username} setUsername={setUsername} password={password} setPassword={setPassword} label="Login" onSubmit={onSubmit}/>
        );
}

// Utilizado para renderizar o formulário de registro
const Register = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    // Executada quando o usuário clica no botão de registro
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:3002/auth/register", {
                username,
                password,
            });
            alert("Cadastro completo! Agora faça o seu login.");
        } catch (err) {
            console.error(err);
        }
    };


    return (
    <Form username={username} setUsername={setUsername} password={password} setPassword={setPassword} label="Cadastre-se já!" onSubmit={onSubmit}/>
    );
};

// Recebe as propiedades como argumentos e retorna o HTML, renderizando o formulário de login
const Form = ({username, setUsername, password, setPassword, label, onSubmit }) => {
    return (
    <div className="auth-container">
    <form onSubmit={onSubmit}>
        <h2>{label}</h2>
        <div className="form-group">
            <label htmlFor="username">Usuário: </label>
            <input type="text" id="username" value={username} onChange={(event) => setUsername(event.target.value)}/>
        </div>
        <div className="form-group">
            <label htmlFor="password">Senha: </label>
            <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)}/>
        </div>

        <button type="submit">
            {label}
        </button>
    </form>
</div>
);
};
