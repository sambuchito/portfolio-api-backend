import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  // 1. Obtener el token del header
  const authHeader = req.header('Authorization');

  // 2. Si no hay token, negar acceso
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Acceso denegado. No hay token.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // 3. Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'mi_secreto_super_seguro');

    // 4. Guardar los datos del usuario en la request
    req.user = decoded;

    // 5. Pasar al siguiente middleware o controlador
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido o expirado.' });
  }
};
