import express from "express";
import cors from 'cors';
import mongoose from 'mongoose';


import {userRouter} from './routes/user.js';
import {recipesRouter} from './routes/recipes.js';

// Inicializa o express
const app = express()

// Utilisa o middleware para lidar com requisições em formato JSON
app.use(express.json());
app.use(cors());

// Define as rotas utilizadas
app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

//Conecta com o MongoDB através do Mongoose
mongoose.connect("mongodb+srv://brunorcarmena1:senha123@raaappp.2gehizx.mongodb.net/test", {
    useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Inicializa o servidor na porta 3002 (http://localhost:3002)
app.listen(3002, () => console.log("Servidor inicializado!"));