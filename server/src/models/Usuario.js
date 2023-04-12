import mongoose, { mongo } from "mongoose"; // Importando biblioteca Mongoose para interação com MongoDB

// Cria novo schema Mongoose para usuários
const UsuarioSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true}, // Campos requeridos de tipo String
    password: {type: String, required: true},
    savedRecipes: [{type: mongoose.Schema.Types.ObjectId, ref: "recipes" }], // Referencia coleção recipes no MongoDB
});

// Exporta o modelo Mongoose para schema de usuário
export const UserModel = mongoose.model("usuarios", UsuarioSchema)