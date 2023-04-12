import { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";

// Componente
export const SavedRecipes = () => {
    // Declarção do estado das receitas salvas
    const [savedRecipes, setSavedRecipes] = useState([]);
    const userID = useGetUserID();

    useEffect(() => {
        // Defince função async para buscar as receitas salvas
        const fetchSavedRecipe = async () => {
            try {
                // Requisição GET para buscar receitas salvas
                const response = await axios.get(`http://localhost:3002/savedRecipes/${userID}`);
                setSavedRecipes(response.data.savedRecipes);
            } catch (err) {
                console.error(err);
            }
        };

        // Chama a função de busca das receitas salvas executando uma vez
        fetchSavedRecipe();
    }, []);


    // Formulário HTML
    return (
    <div>
        <h1>Receitas salvas</h1>
        <ul>
            {savedRecipes.map((recipe) => (
                <li key={recipe._id}>
                    <div>
                        <h2>
                            {recipe.name}
                        </h2>
                    </div>
                    <div className="instructions">
                        <p>
                            {recipe.instructions}
                        </p>
                    </div>
                    <img src={recipe.imageUrl} alt={recipe.name}/>
                    <p>Tempo de Cocção: {recipe.cookingTime} (minutos)</p>
                </li>
            ))}
        </ul>
    </div>
    
    );
};