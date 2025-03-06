// Імпортування бібліотек
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const { connectToDatabase } = require("../utils/db.js");

// Функція для генерації JWT-токену
function generateToken(user) {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
}

// Реєстрація користувача
router.post(
  "/register",
  [
    body("name")
      .isLength({ min: 2 })
      .withMessage("Ім'я має бути щонайменше 2 символи"),
    body("email").isEmail().withMessage("Неправильний email"),
    body("password")
      .isLength({ min: 8 })
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
      .withMessage(
        "Пароль має бути щонайменше 8 символів і містити літери та цифри"
      ),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { name, email, password } = req.body;

    try {
      const db = await connectToDatabase(); // Використання функції з utils/db.js
      const collection = db.collection("users");
      const existingUser = await collection.findOne({ email });
      if (existingUser)
        return res.status(400).json({ message: "Email вже існує" });

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        name,
        email,
        password: hashedPassword,
        createdAt: new Date(),
      };
      await collection.insertOne(newUser);
      res.status(201).json({ message: "Користувач зареєстрований успішно" });
    } catch (error) {
      res.status(500).json({ message: "Помилка сервера" });
    }
  }
);

// Авторизація користувача
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const db = await connectToDatabase(); // Використання функції з utils/db.js
    const collection = db.collection("users");
    const user = await collection.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Неправильний email або пароль" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Неправильний email або пароль" });

    const token = generateToken(user);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Помилка сервера" });
  }
});

module.exports = router; // Експорт роутера
