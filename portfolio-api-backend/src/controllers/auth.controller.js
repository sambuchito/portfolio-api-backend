import User from "../models/user.model.js";

// POST /api/auth/register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validar campos obligatorios
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }

    // Crear nuevo usuario
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({
      message: "Usuario registrado correctamente",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        createdAt: newUser.createdAt,
      },
    });
  } catch (error) {
    console.error("❌ Error en el registro:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};
