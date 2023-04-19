// Importa biblioteca Mongoose para interação com MongoDB
import mongoose from "mongoose";

// Cria novo schema Mongoose para usuários
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Campos requeridos de tipo String
  password: { type: String, required: true },
  savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }], // Referencia coleção recipes no MongoDB
});

// Exporta o modelo Mongoose para schema de usuário
export const UserModel = mongoose.model("users", UserSchema);
