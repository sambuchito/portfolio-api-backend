import jwt from 'jsonwebtoken';


export const authenticate = (req, res, next) => {
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!JWT_SECRET) {
        console.error("JWT_SECRET no está definido. ¡Revisa tu archivo .env!");
        return res.status(500).json({ message: 'Error de configuración del servidor.' });
    }
  // obtengo token del header
  const authHeader = req.headers('authorization');

  // niego acceso si no hay token 
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Acceso denegado. No hay token.' });
  }

  console.log("Header de Autorización Recibido:", authHeader);

  const token = authHeader.split(' ')[1];

  console.log("Token extraído para verificación:", token);

  try {
    // verifico el token
    const decoded = jwt.verify(token, JWT_SECRET);

    // guardo datos del usuario en la request
    req.user = decoded;

    // paso al siguiente middleware o controlador
    next();
  } catch (error) {
    console.error("Fallo la verificación de JWT:", error.message);
    res.status(401).json({ message: 'Token inválido o expirado.' });
  }
};
