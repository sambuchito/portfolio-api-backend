import dotenv from "dotenv";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import commentRoutes from './routes/comments.js';
import responseRoutes from './routes/responses.js';


dotenv.config();

// Conexión a la base de datos
connectDB();

const PORT = process.env.PORT || 4000;

/* const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes); 
const userRoutes = require('./routes/users');*/
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/responses', responseRoutes);

app.listen(PORT, () => {
  console.log(`✅ Servidor escuchando en el puerto ${PORT}`);
});
