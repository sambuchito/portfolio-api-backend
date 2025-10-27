import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";

const app = express();

// middlewares base
app.use(cors());
app.use(express.json());

// para rutas de autenticacion
app.use("/api/auth", authRoutes);

// comentarios
const commentRoutes = require('./routes/commentRoutes');
app.use('/api/comments', commentRoutes);

// ruta de prueba
app.get("/", (req, res) => {
  res.send("API Portfolio funcionando moder ducker");
});

export default app;
