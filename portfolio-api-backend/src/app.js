import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import commentRoutes from "./routes/commentRoutes.js";
import responseRoutes from "./routes/responseRoutes.js";

const app = express();

//definir dis 5173 o 3000
const allowedOrigin = process.env.CLIENT_URL || 'http://localhost:5173';

// Middlewares base
app.use(cors({
    origin: allowedOrigin,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
}));

// app.use(cors({ origin: "http://localhost:3000", credentials: true}));
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
