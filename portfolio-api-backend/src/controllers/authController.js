import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// REGISTRO
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "Todos los campos son obligatorios" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "El email ya está registrado" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ 
      name, 
      email, 
      password: hashedPassword,
    });

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

// LOGIN
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Usuario no encontrado" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" });

    if (!process.env.JWT_SECRET) {
      console.warn("⚠️ No se ha definido JWT_SECRET en el archivo .env. Usando valor por defecto.");
    }

    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      process.env.JWT_SECRET || "mi_secreto_super_seguro", {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Login exitoso",
      token: `Bearer ${token}`,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("❌ Error en el login:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};
