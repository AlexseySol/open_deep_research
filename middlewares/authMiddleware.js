const { verifyToken } = require('../services/authService');

async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }
  const [scheme, token] = authHeader.split(' ');
  if (scheme.toLowerCase() !== 'bearer' || !token) {
    return res.status(401).json({ message: 'Invalid authorization header format' });
  }
  try {
    const user = await verifyToken(token);
    req.user = { identity: user.id };
    next();
  } catch (e) {
    res.status(401).json({ message: `Authentication error: ${e.message}` });
  }
}

module.exports = authMiddleware;
