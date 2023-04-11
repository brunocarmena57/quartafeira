import express from "express";
import cors from 'cors';
import mongoose from 'mongoose';

import {userRouter} from './routes/usuario.js';

const app = express()

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);

mongoose.connect("mongodb+srv://brunocarmena:senha123@receitasapp2.w9qdgt9.mongodb.net/?retryWrites=true&w=majority")

app.listen(3002, () => console.log("Servidor inicializado!"));