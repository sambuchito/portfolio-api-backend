import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  email: {
    type: String,
    required: [true, "El email es obligatorio"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
    minlength: [6, "La contraseña debe tener al menos 6 caracteres"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// para encriptar la contraseña
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// metodo para comparar contraseñas
userSchema.methods.comparePassword = async function (passwordIngresada) {
  return await bcrypt.compare(passwordIngresada, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
