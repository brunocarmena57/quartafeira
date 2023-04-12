import { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import {useNavigate} from "react-router-dom";

// Componente de criação da receita
export const CreateRecipe = () => {
    // Obtém ID de quem está criando
    const userID = useGetUserID();
    // Estado inicial da receita
    const [recipe, setRecipe] = useState({
        name: "",
        ingredients: [],
        instructions: "",
        imageUrl: "",
        cookingTime: 0,
        userOwner: userID,
    });

    const navigate = useNavigate();
    
    // Atualiza o estado da receita
    const handleChange = (event) => {
        const {name, value} = event.target;
        setRecipe({...recipe, [name]: value });
    };

    // Atualiza o estado os ingredientes
    const handleIngredientChange = (event, idx) => {
        const {value} = event.target;
        const ingredients = recipe.ingredients;
        ingredients[idx] = value;
        setRecipe({...recipe, ingredients });
    }

    // Adiciona um novo ingrediente ao estado de ingredientes
    const addIngredient = () => {
        setRecipe({...recipe, ingredients: [...recipe.ingredients, ""]});
    };

    // Submit realizado no formulário de criação da receita
    const onSubmit = async (event) => {
        event.preventDefault("http://localhost:3002/recipes", recipe);
        alert("Receita Criada!");
        navigate("/");
        try {
            // Envia POST com os dados da receita
            await axios.post()
        } catch (err) {
            console.error(err);
        }
    };

    // Retorna o formulário HTML de criação de receita
    return (
    <div className="create-recipe">
        <h2>Criar Receita</h2>
        <form onSubmit={onSubmit}>
            <label htmlFor="name">Nome</label>
            <input type="text" id="name" name="name" onChange={handleChange} />

            <label htmlFor="ingredients">Ingredientes</label>
             {/* Mapeia os ingredientes da receita para exibição dos campos de entrada */}
            {recipe.ingredients.map((ingredient, idx) => (
                <input key={idx} type="text" name="ingredients" value={ingredient} onchange={(event) => handleIngredientChange(event, idx)} />
            ))}
            {/* Botão que adiciona um novo campo de ingrediente */}
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