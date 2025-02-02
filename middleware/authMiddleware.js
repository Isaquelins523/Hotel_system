import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]; // Pega o token após "Bearer"

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Adiciona o usuário ao request

      next();
    } catch (err) {
      res.status(401).json({ message: "Não autorizado, token inválido" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Não autorizado, token não fornecido" });
  }
};

export { protect };
