import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthResponse } from '../../models/auth-response.model';

@Component({
  standalone: false,
  selector: 'app-login',
  templateUrl: './login.component.html', // Шаблон компоненту
  styleUrls: ['./login.component.scss'], // Стилі компоненту
})
export class LoginComponent {
  loginForm!: FormGroup; // Форма входу

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Email (обов'язкове, валідний email)
      password: ['', [Validators.required, Validators.minLength(8)]], // Пароль (обов'язкове, мінімум 8 символів)
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.http
        .post<AuthResponse>(
          'http://localhost:3000/api/auth/login',
          this.loginForm.value
        )
        .subscribe(
          (response) => {
            localStorage.setItem('token', response.token); // Зберігаємо токен
            // alert('Успішний вхід!');
            this.router.navigate(['/profile']);
          },
          (error) => {
            alert('Помилка під час входу.');
          }
        );
    }
  }
}
