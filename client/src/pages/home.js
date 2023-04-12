import { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";

export const Home = () => {
    // Declarando estados e hooks
    const [recipes, setRecipes] = useState([]);
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [cookies, _] = useCookies(["access_token"]);

    const userID = useGetUserID();

    // useEffect para carregar receitas e receitas salvas
    useEffect(() => {
        // Função para buscar receitas
        const fetchRecipe = async () => {
            try {
                const response = await axios.get("http://localhost:3002/recipes");
                setRecipes(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        // Função para buscar receitas salvas
        const fetchSavedRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:3002/savedRecipes/ids/${userID}`);
                setSavedRecipes(response.data.savedRecipes);
            } catch (err) {
                console.error(err);
            }
        };

        fetchRecipe();

        // Verifica se o usuário está logado e busca as receitas dele
        if (cookies.access_token) fetchSavedRecipe();
    }, []);

    // Função para salvar uma receita
    const saveRecipe = async (recipeID) => {
        try {
            const response = await axios.put("http://localhost:3002/recipes", {recipeID, userID,}, { headers: { authorization: cookies.access_token } });
            setSavedRecipes(response.data.savedRecipes);
        } catch (err) {
            console.error(err);
        }
    };

    // Função para verificar se uma receita está salva ou não
    const isRecipeSaved = (id) => savedRecipes.inclues(id);

    // Render HTML do componente
    return (
    <div>
        <h1>Receitas</h1>
        <ul>
            {recipes.map((recipe) => (
                <li key={recipe._id}>
                    <div>
                        <h2>
                            {recipe.name}
                        </h2>
                        <button onclick={() => saveRecipe(recipe._id)} disabled={isRecipeSaved(recipe._id)}>{isRecipeSaved(recipe._id) ? "Salvo" : "Salvar"}</button>
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