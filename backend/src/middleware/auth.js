// Middleware для перевірки JWT-токену
const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1]; // Отримуємо токен з заголовка Authorization

  if (!token) return res.status(401).json({ message: "No token provided" }); // Якщо токен відсутній, повертаємо помилку

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    // Перевіряємо токен
    if (err) return res.status(403).json({ message: "Invalid token" }); // Якщо токен недійсний, повертаємо помилку
    req.userId = decoded.id; // Додаємо ID користувача до запиту
    next(); // Продовжуємо обробку запиту
  });
}

module.exports = { verifyToken }; // Експорт middleware
