import express from 'express'
import mongoose from 'mongoose'
import { RecipeModel } from "../models/Recipes.js";
import { UserModel } from '../models/Usuario.js';
import { verify } from 'jsonwebtoken';

// Criando objeto Router do Express
const router = express.Router();

// Definindo o tipo GET no home para obter todas as receitas do banco
router.get("/", async (req, res) => {
    try {
        const response = await RecipeModel.find({});
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

// Definindo o tipo POST para adicionar uma nova receita no banco
router.post("/", verifyToken, async (req, res) => {
    const recipe = new RecipeModel (req.body);
    try {
        const response = await recipe.save();
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});


// Definindo tipo POST para salvar a receita na lista de receitas salvas
router.post("/", verifyToken, async (req, res) => {
    try {
        const recipe = await RecipeModel.findById(req.body.recipeID);
        const user = await UserModel.findById(req.body.userID);
        user.savedRecipes.push(recipe);
        await user.save();
        res.json({ savedRecipes: user.savedRecipes });
    } catch (err) {
        res.json(err);
    }
});

// Definindo tipo GET para obter as IDs das receitas salvas pelos usuários 
router.get("/savedRecipes/ids/:userID", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID);
        res.json({savedRecipes: user?.savedRecipes});
    } catch (err) {
        res.json(err)
    }
});

// Definindo tipo GET para obter as informações das receitas salvas por um usuário
router.get("/savedRecipes/:userID", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID);
        const savedRecipes = await RecipeModel.find({
            _id: { $in: user.savedRecipes },
        });
        res.json({savedRecipes});
    } catch (err) {
        res.json(err)
    }
});

// Exporta o objeto como módulo
export { router as recipesRouter };