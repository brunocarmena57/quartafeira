import { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";

export const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [cookies, _] = useCookies(["access_token"]);

    const userID = useGetUserID();

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get("http://localhost:3002/recipes");
                setRecipes(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        const fetchSavedRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:3002/savedRecipes/ids/${userID}`);
                setSavedRecipes(response.data.savedRecipes);
            } catch (err) {
                console.error(err);
            }
        };

        fetchRecipe();

        if (cookies.access_token) fetchSavedRecipe();
    }, []);

    const saveRecipe = async (recipeID) => {
        try {
            const response = await axios.put("http://localhost:3002/recipes", {recipeID, userID,}, { headers: { authorization: cookies.access_token } });
            setSavedRecipes(response.data.savedRecipes);
        } catch (err) {
            console.error(err);
        }
    };

    const isRecipeSaved = (id) => savedRecipes.inclues(id);

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