import mongoose from "mongoose";  // Importando biblioteca Mongoose para interação com MongoDB

// Criando um novo schema do Mongoose para as receitas
const RecipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    ingredients: [{
        type: String,
        required: true}],
    instructions: 
        {type: String, 
        required: true},
    imageUrl:
        {type: String, 
        required: true},
    cookingTime:
        {type: Number, 
        required: true},
    userOwner:
        {type: mongoose.Schema.Types.ObjectId, 
        ref: "users",  // Referencia a coleção "users" no MongoDB
        required: true,},
});

// Cria modelo do Mongoose para o schema de receita e exporta ele
export const RecipeModel = mongoose.model("recipes", RecipeSchema)