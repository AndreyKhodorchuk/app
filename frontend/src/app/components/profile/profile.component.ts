import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  standalone: false,
  selector: 'app-profile',
  templateUrl: './profile.component.html', // Шаблон компоненту
  styleUrls: ['./profile.component.scss'], // Стилі компоненту
})
export class ProfileComponent {
  user!: User; // Дані користувача
  editForm!: FormGroup; // Форма редагування профілю

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('token'); // Отримуємо токен

    if (token) {
      this.http
        .get<User>('http://localhost:3000/api/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .subscribe(
          (response) => {
            this.user = response; // Зберігаємо дані користувача
            this.initEditForm(); // Ініціалізуємо форму редагування
          },
          (error) => {
            alert('Помилка під час завантаження профілю.');
          }
        );
    } else {
      this.router.navigate(['/login']); // Перенаправляємо на сторінку логіну}
    }
  }

  initEditForm() {
    this.editForm = this.fb.group({
      name: [this.user.name, [Validators.required, Validators.minLength(2)]], // Ім'я (обов'язкове, мінімум 2 символи)
      surname: [
        this.user.surname,
        [Validators.required, Validators.minLength(2)],
      ], // Прізвище (обов'язкове, мінімум 2 символи)
      email: [this.user.email, [Validators.required, Validators.email]], // Email (обов'язкове, валідний email)
      phone: [this.user.phone || '', [Validators.pattern(/^\+?\d{10,15}$/)]], // Телефон (опціональне, формат +XXX...)
    });
  }

  updateProfile() {
    if (this.editForm.valid) {
      const token = localStorage.getItem('token');
      this.http
        .put(
          `http://localhost:3000/api/users/${this.user._id}`,
          this.editForm.value,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .subscribe(
          () => {
            alert('Профіль оновлено успішно!');
          },
          (error) => {
            alert('Помилка під час оновлення профілю.');
          }
        );
    }
  }

  deleteAccount() {
    if (confirm('Впевнені, що хочете видалити свій обліковий запис?')) {
      const token = localStorage.getItem('token');
      this.http
        .delete(`http://localhost:3000/api/users/${this.user._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .subscribe(
          () => {
            this.router.navigate(['/login']); // Перенаправляємо на сторінку логіну
            localStorage.removeItem('token'); // Видаляємо токен
            alert('Обліковий запис видалено!');
          },
          (error) => {
            alert('Помилка під час видалення облікового запису.');
          }
        );
    }
  }

  logout() {
    localStorage.removeItem('token'); // Видаляємо токен
    this.router.navigate(['/login']); // Перенаправляємо на сторінку логіну
  }
}
