import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Імпортування компонентів
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';

// Маршрути
const routes: Routes = [
  { path: 'register', component: RegisterComponent }, // Реєстрація
  { path: 'login', component: LoginComponent }, // Вхід
  { path: 'profile', component: ProfileComponent }, // Особистий кабінет
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Перенаправлення на сторінку входу
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
