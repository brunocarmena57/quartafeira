import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

export const SavedRecipes = () => {
  // Declarção do estado das receitas salvas
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    // Defince função async para buscar as receitas salvas
    const fetchSavedRecipes = async () => {
      try {
        // Requisição GET para buscar receitas salvas
        const response = await axios.get(
          `http://localhost:3002/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    // Chama a função de busca das receitas salvas executando uma vez
    fetchSavedRecipes();
  }, []);

  // Formulário HTML
  return (
    <div>
      <h1>Receitas salvas</h1>
      <ul>
        {savedRecipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
            </div>
            <p>{recipe.description}</p>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p>Tempo de Cocção: {recipe.cookingTime} minutos</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
