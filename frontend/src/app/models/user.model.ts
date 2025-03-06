// Інтерфейс для моделі користувача
export interface User {
  _id?: string; // ID користувача
  name: string; // Ім'я користувача
  surname: string; // Прізвище користувача
  email: string; // Email користувача
  phone?: string; // Телефон користувача
  createdAt: Date; // Дата реєстрації
}
