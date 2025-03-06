open file frontend
cd frontend,
Install dependencies: npm install,

Start the app: npm start

Technologies
Angular
TypeScript

Technologies
Angular 19+
Reactive Forms
Bootstrap 5
HttpClient
TypeScript
Type-safe codebase
RxJS

Key Features

1. Registration
   Validates:
   Name (minimum 2 characters)
   Email (format validation)
   Password (minimum 8 characters, letters + numbers)
2. User Profile
   Fetches user data via GET /api/users/me (requires JWT token).
   Updates profile via PUT /api/users/me (supports name, surname, email, phone).
   Deletes account via DELETE /api/users/me (confirmation prompt).

Configuration
API URL:
Set in src/environments/environment.ts for development.
Update src/environments/environment.prod.ts for production.
JWT Token Storage:
Token is stored in localStorage after login.

Security
JWT Authentication:
All /profile routes require a valid token in the Authorization header.
Client-Side Validation:
Forms use Angular Reactive Forms validators.
