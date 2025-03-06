// Підключення до MongoDB
const { MongoClient } = require("mongodb");

async function connectToDatabase() {
  const uri = process.env.MONGO_URI; // Отримуємо URL бази даних з .env
  const client = new MongoClient(uri); // Створюємо клієнта для MongoDB

  try {
    await client.connect(); // Підключаємося до бази даних
    console.log("Connected to MongoDB"); // Виводимо повідомлення про успішне підключення
    return client.db("appuserdashboard"); // Повертаємо об'єкт бази даних
  } catch (error) {
    console.error("Error connecting to MongoDB:", error); // Виводимо помилку при невдачі
    throw error; // Кидаемо помилку для зупинки програми
  }
}

module.exports = { connectToDatabase }; // Експорт функції для підключення
