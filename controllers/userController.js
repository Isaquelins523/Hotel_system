import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Login de usuário
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Usuário não encontrado" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Senha incorreta" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erro ao fazer login", error: err.message });
  }
};

//POST

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "Usuário já existe" });
    }

    const user = new User({
      name,
      email,
      password,
    });

    await user.save();
    res.status(201).json({ message: "Usuário registrado com sucesso" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erro ao criar usuário", error: err.message });
  }
};
