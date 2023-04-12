import express from 'express'
import jwt from 'jsonwebtoken' // Modulo para autenticação
import bcrypt from 'bcrypt' // Módulo criptografia senha
import { UserModel } from '../models/Usuario.js'; // Modelo do usuário

// Criação da instância do router express
const router = express.Router()

// Rota para registrar novo usuário
router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    // Verifica se o usuário já existe no banco de dados
    const user = await UserModel.findOne({ username });

    if (user) {
        return res.json({message: "Esse usuário já existe!"});
    }

    // Criptografia a senha do usuário
    const hashedPassword = await bcrypt.hash(password, 10)

    // Cria um novo usuário com o username e o password
    const newUser = new UserModel({username, password: hashedPassword});
    // Salva o novo usuário no MongoDB
    await newUser.save();

    // Retorna mensagem de sucesso
    res.json({message: "Usuário cadastrado corretamente!"});
});

// Rota para fazer login
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    // Busca o usuário no banco de dados pelo nome
    const user = await UserModel.findOne({ username });

    // Se o usuário não existe, retorna mensagem
    if (!user) {
        return res.json({ message: "Usuário não existe!"});
    }

    // Compara senha fornecida com a senha criptografada do usuário
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // Se a senha estiver errada, retorna mensagem de erro
    if (!isPasswordValid) {
        return res.json({message: "Usuário ou senha são incorretas"});
    }

    // Gera token de auth com id do usuário
    const token = jwt.sign({id: user._id}, "secret");
    // Retorna token e ID do usuário
    res.json({ token, userID: user._id });
});


export {router as userRouter};

// Função para verificar se o token enviado junto com a requisição é valido
export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    // Verifica se o token foi enviado com a requisição
    if (token) {
        // Verifica se o token é valido
        jwt.verify(token, "secret", (err) => {
            if (err) return res.sendStatus(403); // Retorna erro 403 se o token for inválido
            next();
        })
    } else {
        res.sendStatus(401); // Retorna erro 41 se não existir um token na requisição
    }
}