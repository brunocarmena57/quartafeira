import { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import {useNavigate} from "react-router-dom";

export const CreateRecipe = () => {
    const userID = useGetUserID();
    const [recipe, setRecipe] = useState({
        name: "",
        ingredients: [],
        instructions: "",
        imageUrl: "",
        cookingTime: 0,
        userOwner: userID,
    });

    const navigate = useNavigate();
    

    const handleChange = (event) => {
        const {name, value} = event.target;
        setRecipe({...recipe, [name]: value });
    };

    const handleIngredientChange = (event, idx) => {
        const {value} = event.target;
        const ingredients = recipe.ingredients;
        ingredients[idx] = value;
        setRecipe({...recipe, ingredients });
    }

    const addIngredient = () => {
        setRecipe({...recipe, ingredients: [...recipe.ingredients, ""]});
    };

    const onSubmit = async (event) => {
        event.preventDefault("http://localhost:3002/recipes", recipe);
        alert("Receita Criada!");
        navigate("/");
        try {
            await axios.post()
        } catch (err) {
            console.error(err);
        }
    };

    return (
    <div className="create-recipe">
        <h2>Criar Receita</h2>
        <form onSubmit={onSubmit}>
            <label htmlFor="name">Nome</label>
            <input type="text" id="name" name="name" onChange={handleChange} />

            <label htmlFor="ingredients">Ingredientes</label>
            {recipe.ingredients.map((ingredient, idx) => (
                <input key={idx} type="text" name="ingredients" value={ingredient} onchange={(event) => handleIngredientChange(event, idx)} />
            ))}
            <button onclick={addIngredient} type="button">Adicionar ingrediente</button>

            <label htmlFor="instructions">Instruções</label>
            <textarea id="instructions" name="instructions" onChange={handleChange}></textarea>

            <label htmlFor="imageUrl">Imagem URL</label>
            <input type="text" id="imageUrl" name="imageUrl" onChange={handleChange}/>

            <label htmlFor="cookingTime">Tempo de cocção (minutos)</label>
            <input type="number" id="cookingTime" name="cookingTime" onChange={handleChange}/>

            <button type="submit">Criar Receita</button>
        </form>
        </div>
    );
};