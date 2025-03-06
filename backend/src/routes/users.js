// Імпортування бібліотек
const express = require("express");
const { ObjectId } = require("mongodb");
const { verifyToken } = require("../middleware/auth"); // Шлях до middleware
const { connectToDatabase } = require("../utils/db.js"); // Коректний шлях до utils/db.js

const router = express.Router();

router.get("/me", verifyToken, async (req, res) => {
  try {
    const db = await connectToDatabase(); // Використання функції з utils/db.js
    const collection = db.collection("users");
    const user = await collection.findOne(
      { _id: new ObjectId(req.userId) },
      { projection: { password: 0 } }
    );
    if (!user)
      return res.status(404).json({ message: "Користувач не знайдений" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Помилка сервера" });
  }
});

// Отримання користувача за ID
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const db = await connectToDatabase(); // Використання функції з utils/db.js
    const collection = db.collection("users");
    const user = await collection.findOne(
      { _id: new ObjectId(req.params.id) },
      { projection: { password: 0 } }
    );
    if (!user)
      return res.status(404).json({ message: "Користувач не знайдений" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Помилка сервера" });
  }
});

// Оновлення користувача
router.put("/:id", verifyToken, async (req, res) => {
  const { name, surname, phone } = req.body;

  try {
    const db = await connectToDatabase(); // Використання функції з utils/db.js
    const collection = db.collection("users");
    const result = await collection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { name, surname, phone } }
    );

    if (result.matchedCount === 0)
      return res.status(404).json({ message: "Користувач не знайдений" });
    res.json({ message: "Профіль оновлено успішно" });
  } catch (error) {
    res.status(500).json({ message: "Помилка сервера" });
  }
});

// Видалення користувача
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const db = await connectToDatabase(); // Використання функції з utils/db.js
    const collection = db.collection("users");
    const result = await collection.deleteOne({
      _id: new ObjectId(req.params.id),
    });

    // if (result.deletedCount === 0)
    //   return res.status(404).json({ message: "Користувач не знайдений" });
    res.json({ message: "Акаунт видалено успішно" });
  } catch (error) {
    res.status(500).json({ message: "Помилка сервера" });
  }
});

module.exports = router; // Експорт роутера
