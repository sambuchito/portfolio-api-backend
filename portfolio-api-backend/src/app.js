import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import commentRoutes from "./routes/commentRoutes.js";
import responseRoutes from "./routes/responseRoutes.js";

const app = express();

// Middlewares base
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/responses", responseRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("API Portfolio funcionando moder ducker 😎");
});

export default app;
