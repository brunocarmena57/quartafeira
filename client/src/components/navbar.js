import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/auth");
  };
  return (
    <div className="navbar">
      <Link to="/">Inicio</Link>
      <Link to="/create-recipe">Criar Receita</Link>
      <Link to="/saved-recipes">Receitas Salvas</Link>
      {!cookies.access_token ? (
        <Link to="/auth">Cadastro</Link>
      ) : (
        <button onClick={logout}> Sair </button>
      )}
    </div>
  );
};
