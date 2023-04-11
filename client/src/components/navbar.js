import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
    <div className="navbar">
        <Link to="/"> Início</Link>
        <Link to="/create-receita"> Criar Receita</Link>
        <Link to="/receita-salva"> Receitas Salvas</Link>
        <Link to="/auth"> Login/Cadastrar</Link>
    </div>
    );
;}