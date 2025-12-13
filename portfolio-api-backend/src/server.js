import dotenv from "dotenv";
dotenv.config();
//import { createRequire } from 'module';
//const require = createRequire(import.meta.url);
//require('dotenv').config();

import app from "./app.js";
import connectDB from "./config/db.js";
//import authRoutes from './src/routes/auth.routes.js';
//import userRoutes from './src/routes/users.js';
//import commentRoutes from './src/routes/commentRoutes.js';
//import responseRoutes from './src/routes/responseRoutes.js';


// Conexión a la base de datos
connectDB();

const PORT = process.env.PORT || 4000;

//app.use('/api/users', userRoutes);
//app.use('/api/auth', authRoutes);
//app.use('/api/comments', commentRoutes);
//app.use('/api/responses', responseRoutes);

app.listen(PORT, () => {
  console.log(`✅ Servidor escuchando en el puerto ${PORT}`);
});
