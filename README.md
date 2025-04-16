# E-Pharm 💊

**E-Pharm** is an innovative medicine delivery application developed collaboratively by a dedicated team. Built on the **MERN stack** (MongoDB, Express.js, React, Node.js), with **TailwindCSS** for styling and **Firebase Atlas** for authentication and cloud storage, E-Pharm offers a secure, intuitive, and efficient way to have medications delivered to your door.

## 📑 Table of Contents
1. [Project Overview](#project-overview)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Features](#features)
5. [Technologies Used](#technologies-used)
6. [Cookies and Authentication](#cookies-and-authentication)
7. [Screenshots](#screenshots)
8. [Team Members](#team-members)

## Project Overview

**E-Pharm** allows users to browse a catalog of medications, manage their shopping cart, and place orders quickly and securely. The system also provides a dashboard for couriers to manage deliveries. The app is built using the MERN stack and integrates Firebase for authentication and real-time features.

## Installation

### 🔧 Backend

**1. Clone the repository**
```bash
git clone https://github.com/AndreeaP31/E-Pharm.git
```

**2. Navigate to the backend directory**
```bash
cd E-Pharm/backend
```

**3. Install dependencies**
```bash
npm install
```

**4. Configure environment**
- Add your MongoDB URI and Firebase credentials to a `.env` file.

**5. Run the backend server**
```bash
npm run dev
```

### 💻 Frontend

**1. Navigate to the frontend directory**
```bash
cd ../frontend
```

**2. Install dependencies**
```bash
npm install
```

**3. Start the frontend**
```bash
npm run dev
```

App will be available at: `http://localhost:5173`

## Usage

**Users can:**
- Register and log in
- Browse and search medicines
- Add medicines to cart and place orders

**Couriers can:**
- View assigned deliveries
- Update delivery status

## Features

- Secure authentication with JWT and HTTP-only cookies
- Responsive design using TailwindCSS
- Product search and filters
- Cart functionality
- Courier dashboard

## Technologies Used

- MongoDB
- Express.js
- React
- Node.js
- TailwindCSS
- Firebase
- JavaScript

## Cookies and Authentication

JWT is stored in an HTTP-only cookie:

```js
const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });

res.cookie('token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000
});
```

## Screenshots

### 🏠 Home Page
![image](https://github.com/user-attachments/assets/83e6853f-69da-41ab-957c-a8ea4fae441e)

### 🔐 Login & Sign Up
![image](https://github.com/user-attachments/assets/80a64fb8-7dd4-4b7d-a138-42f90345a0e0)

![image](https://github.com/user-attachments/assets/0fb15ace-ba83-4c23-b573-b8b7f339f25b)


### 💊 Pharmacy View
![image](https://github.com/user-attachments/assets/5cc7d6db-3af7-4199-b040-b44a3201ec26)


### 🛒 Cart & Checkout
![image](https://github.com/user-attachments/assets/05ff36c9-316e-4b0a-8798-8a765225602b)

![image](https://github.com/user-attachments/assets/4f1beab2-2716-41ca-a9fc-57e4d05cb58b)

### 📦 Courier Page
![image](https://github.com/user-attachments/assets/1e007354-5b5a-4103-972c-74eb964d57ba)

## Team Members

- **Andreea Popovici** – Backend Developer, Database Management, API Routing  
  [GitHub](https://github.com/AndreeaP31)

- **Cezara Nedelea** – Frontend Developer, Backend Support  
  [GitHub](https://github.com/cezaraandreea)
