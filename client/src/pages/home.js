import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

export const Home = () => {
  // Criação do estado de receitas e suas funções para alteração
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);

  // Utilização do hook personalizado para obter o ID do usuário
  const userID = useGetUserID();

  // Utilização do useEffect para fazer as requisições HTTP assim que o componente for montado
  useEffect(() => {
   // Função assíncrona para buscar as receitas
    const fetchRecipes = async () => {
      try {
        // Requisição HTTP utilizando Axios
        const response = await axios.get("http://localhost:3002/recipes");
        // Atualização do estado das receitas
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    // Função assíncrona para buscar as receitas salvas do usuário
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    // Chamada da função para buscar as receitas
    fetchRecipes();
    // Chamada da função para buscar as receitas salvas do usuário
    fetchSavedRecipes();
  // O array vazio indica que a função deve ser executada apenas uma vez, quando o componente for montado
  }, []);

  // Função async para salvar uma receita
  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("http://localhost:3002/recipes", {
        recipeID,
        userID,
      });
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  // Função para verificar se uma receita está salva ou não
  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <div>
      <h1>Receitas</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
              <button
                onClick={() => saveRecipe(recipe._id)}
                disabled={isRecipeSaved(recipe._id)}
              >
                {isRecipeSaved(recipe._id) ? "Salvo" : "Salvar"}
              </button>
            </div>
            <div className="instructions">
              <p>{recipe.instructions}</p>
            </div>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p>Tempo de Cocção: {recipe.cookingTime} minutos.</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
