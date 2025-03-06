import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Імпортування компонентів
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule, // Браузерний модуль
    ReactiveFormsModule, // Reactive Forms модуль
    HttpClientModule, // HTTP клієнт
    AppRoutingModule,
  ],
  providers: [], // Сервіси
  bootstrap: [AppComponent], // Головний компонент
})
export class AppModule {}
