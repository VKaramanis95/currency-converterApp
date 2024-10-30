# Currency Converter API

## Overview

This project is a full-stack application that provides currency conversion functionalities. It features a RESTful API for managing currencies and their exchange rates, along with a frontend built using Vue.js for a user-friendly interface.

## Technologies

- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Frontend**: Vue.js, Axios
- **Validation**: express-validator
- **Authentication**: JWT (JSON Web Tokens) for protected routes
- **Deployment**: Netlify (for frontend), Heroku/Render (for backend)

## Project Structure
/backend
│
├── config
│ └── db.js: Database connection setup
│
├── controllers
│ ├── authController.js: Handles authentication and user registration
│ └── currencyController.js: CRUD operations for currency exchange rates
│
├── middleware
│ └── authMiddleware.js: Middleware for authentication and authorization
│
├── models
│ ├── currency.js: Schema for currency data
│ └── user.js: Schema for user data
│
├── routes
│ ├── authRoutes.js: Routes for login and registration
│ ├── conversionRoutes.js: Routes for currency conversion
│ └── currencyRoutes.js: Routes for currency management (CRUD)
│
├── .env: Environment variables
│
└── server.js: Main server file


/frontend 
├── assets │ 
│   └── style.css: Styling for the application
├── components │ 
│   ├── CurrencyConverter.vue: Component for currency conversion
│   ├── CurrencyManager.vue: Component for managing currencies and rates
│   ├── Login.vue: Login form
│   └── Register.vue: Registration form
├── router │ 
│   └── index.js: Vue Router setup 
├── api.js: Handles API requests 
├── App.vue: Root Vue component 
└── main.js: Vue app entry point 


## Installation
### Prerequisites
  -Node.js
  -MongoD# Project Structure

## Backend
# Project Structure

## Backend
- /backend
  - config
    - db.js: Database connection setup
  - controllers
    - authController.js: Handles authentication and user registration
    - currencyController.js: CRUD operations for currency exchange rates
  - middleware
    - authMiddleware.js: Middleware for authentication and authorization
  - models
    - currency.js: Schema for currency data
    - user.js: Schema for user data
  - routes
    - authRoutes.js: Routes for login and registration
    - conversionRoutes.js: Routes for currency conversion
    - currencyRoutes.js: Routes for currency management (CRUD)
  - .env: Environment variables
  - server.js: Main server file

## Frontend


### Backend
    1. Clone the repository:
          git clone https://github.com/VKaramanis95/currency-converterApp.git
          cd backend
    2. Install Dependencies
          npm install
    3. Set up your MongoDB database and update the .env file
          MONGODB_URI=mongodb+srv://vkaramanis95:FQCGUzzXpSp4DxNF@cluster0.i46vk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
          JWT_SECRET=your_jwt_secret_key
          JWT_EXPIRES_IN=3600
    4. Start the server:
          node server.js
### Frontend
    1. Navigate to the frontend directory:
       cd frontend
    2. Install dependencies:
       npm install
    3. Start the frontend:
       npm run serve
    4.Once the servers are running, you can access the frontend at <link>http://localhost:8080</link>

### Usage
1. Authentication:
     -Users can register and log in using the provided forms.
2. Currency Management:
     -Authenticated users can add, update, and delete currencies.
3. Currency Conversion:
     -Users can convert between different currencies using the converter component.
   
### API Endpoints Documentation
#### Currency Conversion/Management
 1.Convert Currency
    -Method: POST
    -URL: http://localhost:5000/api/conversion/convert
    -Request Body:
        {
          "from": "USD",
          "to": "EUR",
          "originalAmount": 100
        }
 
 2. Get All Currencies
    -Method: GET
    -URL: http://localhost:5000/api/currency/
    -Description: Retrieves all currency exchange rates.
 3. Get Currency by Code
    -Method: GET
    -URL: http://localhost:5000/api/currency/{id} or {code}
    -Description: Retrieves the exchange rate for a specific currency.
4. Add Currency
    -Method: POST
    -URL: http://localhost:5000/api/currency
    -Request Body:
       {
          "code": "USD",
          "rate": 1
        }
5. Update Currency
    -Method: PUT
    -URL: http://localhost:5000/api/currency/{id}
    -Request Body:
       {
          "rate": 1.05
        }
6. Delete Currency
    -Method: DELETE
    -URL: http://localhost:5000/api/currency/{id}
    -Description: Deletes a currency by its ID or code (e.g., USD or 671cce18345ad681773d5b0a).

#### Authentication
7. User Registration
    -Method: POST
    -URL: http://localhost:5000/api/auth/register
    -Request Body:
       {
          "username": "testuser",
          "password": "testpassword"
        }
8. User Login
    -Method: POST
    -URL: http://localhost:5000/api/auth/login
    -Request Body:
       {
          "username": "testuser",
          "password": "testpassword"
        }

### Error Handling
All responses will include appropriate HTTP status codes. Common errors include:
  -400 Bad Request: Invalid request parameters.
  -401 Unauthorized: Authentication required or failed.
  -404 Not Found: Requested resource does not exist.
  -500 Internal Server Error: Server encountered an unexpected condition.






     



