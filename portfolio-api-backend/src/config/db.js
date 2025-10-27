import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Conexión a MongoDB establecida correctamente");
  } catch (error) {
    console.error("❌ Error al conectar con MongoDB:", error.message);
    process.exit(1); // Detiene la app si no logra conectar
  }
};

export default connectDB;
