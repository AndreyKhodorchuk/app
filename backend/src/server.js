// Імпортування бібліотек
const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const dotenv = require("dotenv");

// Завантаження змінних середовища
dotenv.config();

// Ініціалізація Express
const app = express();
app.use(express.json());
app.use(cors());

// Підключення до MongoDB
let db;

async function connectToDatabase() {
  const uri = process.env.MONGO_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    db = client.db("appuserdashboard");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

connectToDatabase();

// Імпортування роутерів
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");

// Встановлення роутів
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Старт сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
