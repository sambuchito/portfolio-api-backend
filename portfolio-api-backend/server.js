import dotenv from "dotenv";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";

dotenv.config();

// Conexión a la base de datos
connectDB();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`✅ Servidor escuchando en el puerto ${PORT}`);
});
