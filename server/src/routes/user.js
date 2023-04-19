import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();
import { UserModel } from "../models/Users.js";

// Endpoint que realiza o registro de um novo usuário
router.post("/register", async (req, res) => {
  const { username, password } = req.body; // obtém o username e o password da requisição
  const user = await UserModel.findOne({ username }); // busca um usuário com o mesmo username
  if (user) {
    return res.status(400).json({ message: "Username already exists" }); // retorna erro 400 se já houver um usuário com o mesmo username
  }
  const hashedPassword = await bcrypt.hash(password, 10); // criptografa a senha
  const newUser = new UserModel({ username, password: hashedPassword }); // cria um novo usuário com o username e senha criptografada
  await newUser.save(); // salva o novo usuário no banco de dados
  res.json({ message: "User registered successfully" }); // retorna a mensagem de sucesso
});

// Endpoint que realiza o login de um usuário
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username });

  if (!user) {
    return res
      .status(400)
      .json({ message: "Username or password is incorrect" });
  }
  // verifica se a senha informada é a mesma que está no banco de dados
  const isPasswordValid = await bcrypt.compare(password, user.password); 
  if (!isPasswordValid) {
    return res
      .status(400)
      .json({ message: "Username or password is incorrect" });
  }
  const token = jwt.sign({ id: user._id }, "secret"); // cria um token JWT com o id do usuário
  res.json({ token, userID: user._id }); // retorna o token e o id do usuário
});

export { router as userRouter };

// Função middleware que verifica se o token enviado pelo cliente é válido
export const verifyToken = (req, res, next) => { 
  const authHeader = req.headers.authorization; // obtém o cabeçalho Authorization da requisição
  if (authHeader) {
    jwt.verify(authHeader, "secret", (err) => { // verifica se o token é válido com a chave "secret"
      if (err) {
        return res.sendStatus(403); // retorna erro 403 se o token for inválido
      }
      next(); // chama a próxima função middleware se o token for válido
    });
  } else {
    res.sendStatus(401);
  }
};
