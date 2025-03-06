open file backend
cd backend,
Install dependencies: npm init -y,

Create a .env file with:
PORT=3000
MONGO_URI=mongodb+srv://username:<password>@appuserdashboard.p2cnq.mongodb.net/?retryWrites=true&w=majority&appName=appuserdashboard
JWT_SECRET=your_jwt_secret_key,

MongoDB atlas: cluster name: appuserdashboard collection name: users

Usage

# Start in development mode (with nodemon):

npm run dev

# Start in production:

npm start

Technologies
Node.js
Express.js
MongoDB (via Node.js driver)
JWT (JSON Web Tokens)
Bcrypt.js (password hashing)
dotenv (environment variables)

API Endpoints
Authentication
POST /api/auth/register
Register a new user
{ "name": "string", "email": "string", "password": "string" }

POST /api/auth/login
Log in a user
{ "email": "string", "password": "string" }

User Profile
GET /api/users/me
Get user profile (requires JWT token)
PUT /api/users/me
Update profile (requires JWT token)
DELETE /api/users/me
Delete account (requires JWT token)

GET /api/users/:id (New)
Description: Get user by ID.
Path Param: :id (user’s MongoDB ID).
Header: Authorization: Bearer JWT_TOKEN
