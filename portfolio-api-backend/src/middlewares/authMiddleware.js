const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // 1. Obtener el token del header
  const token = req.header('Authorization');

  // 2. Si no hay token, negar acceso
  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. No hay token.' });
  }

  try {
    // 3. Verificar el token
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);

    // 4. Guardar los datos del usuario en la request
    req.user = decoded;

    // 5. Pasar al siguiente middleware o controlador
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido o expirado.' });
  }
};

module.exports = authMiddleware;
