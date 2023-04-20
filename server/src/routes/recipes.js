// Importação dos módulos express e mongoose, bem como dos diferentes modelos
import express from "express";
import mongoose from "mongoose";
import { RecipesModel } from "../models/Recipes.js";
import { UserModel } from "../models/Users.js";
import { verifyToken } from "./user.js";

// Criação de um novo router do Express
const router = express.Router();

// Endpoint que retorna todas as receitas cadastradas no banco de dados
router.get("/", async (req, res) => {
  try {
    const result = await RecipesModel.find({});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Endpoint que cria uma nova receita
router.post("/", verifyToken, async (req, res) => {
  // Cria uma nova instância do modelo de dados para receitas a partir dos dados enviados na requisição
  const recipe = new RecipesModel({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    image: req.body.image,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    imageUrl: req.body.imageUrl,
    cookingTime: req.body.cookingTime,
    userOwner: req.body.userOwner,
  });
  console.log(recipe);

  try {
        // Salva a nova receita no banco de dados e retorna um objeto JSON com os dados da receita criada
    const result = await recipe.save();
    res.status(201).json({
      createdRecipe: {
        name: result.name,
        image: result.image,
        ingredients: result.ingredients,
        instructions: result.instructions,
        _id: result._id,
      },
    });
  } catch (err) {
      // Retorna um erro HTTP 500 caso ocorra algum erro ao salvar a nova receita no banco de dados
    res.status(500).json(err);
  }
});

// Endpoint que retorna uma receita específica a partir do seu ID
router.get("/:recipeId", async (req, res) => {
  try {
    // Busca a receita com o ID especificado no banco de dados e retorna um objeto JSON com seus dados
    const result = await RecipesModel.findById(req.params.recipeId);
    res.status(200).json(result);
  } catch (err) {
    // Retorna um erro HTTP 500 caso ocorra algum erro ao buscar a receita no banco de dados
    res.status(500).json(err);
  }
});

// Endpoint que salva uma receita na lista de receitas salvas de um usuário
router.put("/", async (req, res) => {
  // Busca a receita e o usuário no banco de dados a partir dos IDs especificados na requisição
  const recipe = await RecipesModel.findById(req.body.recipeID);
  const user = await UserModel.findById(req.body.userID);
  try {
    // Adiciona a receita na lista de receitas salvas do usuário e salva as alterações no banco de dados
    user.savedRecipes.push(recipe);
    await user.save();
    // Retorna um objeto JSON com a lista atualizada de receitas salvas do usuário
    res.status(201).json({ savedRecipes: user.savedRecipes });
  } catch (err) {
    // Retorna um erro HTTP 500 caso ocorra algum erro ao salvar a receita na lista de receitas salvas do usuário
    res.status(500).json(err);
  }
});

// Endpoint que retorna os IDs das receitas salvas por um usuário
router.get("/savedRecipes/ids/:userId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    res.status(201).json({ savedRecipes: user?.savedRecipes });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Endpoint que retorna as receitas salvas por um usuário
router.get("/savedRecipes/:userId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    const savedRecipes = await RecipesModel.find({
      _id: { $in: user.savedRecipes },
    });

    console.log(savedRecipes);
    res.status(201).json({ savedRecipes });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Exporta o router contendo as rotas para manipulação de receitas
export { router as recipesRouter };
