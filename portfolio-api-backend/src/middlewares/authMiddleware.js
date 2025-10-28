import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  // obtengo token del header
  const authHeader = req.header('Authorization');

  // niego acceso si no hay token 
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Acceso denegado. No hay token.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // verifico el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'mi_secreto_super_seguro');

    // guardo datos del usuario en la request
    req.user = decoded;

    // paso al siguiente middleware o controlador
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido o expirado.' });
  }
};
