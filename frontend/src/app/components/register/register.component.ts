import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: false,
  selector: 'app-register',
  templateUrl: './register.component.html', // Шаблон компоненту
  styleUrls: ['./register.component.scss'], // Стилі компоненту
})
export class RegisterComponent {
  registerForm!: FormGroup; // Форма реєстрації

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]], // Ім'я (обов'язкове, мінімум 2 символи)
      email: ['', [Validators.required, Validators.email]], // Email (обов'язкове, валідний email)
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
        ],
      ], // Пароль (обов'язкове, мінімум 8 символів, літери та цифри)
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.http
        .post(
          'http://localhost:3000/api/auth/register',
          this.registerForm.value
        )
        .subscribe(
          () => {
            alert('Реєстрація успішна!');
          },
          (error) => {
            alert('Помилка під час реєстрації.');
          }
        );
    }
  }
}
