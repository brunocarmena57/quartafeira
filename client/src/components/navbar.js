import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";

// Definição do componente Navbar
export const Navbar = () => {
    // Usa hook useCookies para armazenar cookies e atualizar eles
    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate()
    
    // Remove o cookie de acesso, deslogando o ID do usuário e navega para página de login
    const logout = () => {
        setCookies("access_token", "")
        window.localStorage.removeItem("userID");
        navigate("/auth")
    }
    return (
    <div className="navbar">
        <Link to="/"> Início</Link>
        <Link to="/create-receita"> Criar Receita</Link>
        <Link to="/receita-salva"> Receitas Salvas</Link>
        {!cookies.access_token ? (<Link to="/auth"> Login/Cadastrar</Link>) : (<button onClick={logout}>Sair</button>)}
        
    </div>
    );
;}