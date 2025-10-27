import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";

const app = express();

// middlewares base
app.use(cors());
app.use(express.json());

// para rutas de autenticacion
app.use("/api/auth", authRoutes);

// ruta de prueba
app.get("/", (req, res) => {
  res.send("API Portfolio funcionando moder ducker");
});

export default app;
