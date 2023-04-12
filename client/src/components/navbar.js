import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";


export const Navbar = () => {
    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate()
    
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