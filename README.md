# Natours API - Modern Tour Booking Platform

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white)

Natours is a comprehensive and scalable **RESTful API** built for a tour booking application. Developed using **Node.js, Express, TypeScript, and MongoDB**, this backend system provides robust features including secure user authentication, complex data modeling, secure payment processing, and advanced error handling.

This project demonstrates strong backend engineering principles, aligning with modern scalable architectures and robust security practices.

## 🚀 Key Features

*   **Robust RESTful API:** Designed a clean and scalable API architecture supporting comprehensive CRUD operations for Tours, Users, Reviews, and Bookings.
*   **Authentication & Authorization:** Secure JWT-based authentication system with role-based access control (Admin, Lead Guide, Guide, User), ensuring secure data access.
*   **Advanced Database Management:** Implemented complex data modeling using **Mongoose**, including geospatial queries (finding tours within a certain radius), data aggregation, and virtual populate.
*   **Security First:** Integrated advanced security measures including **Helmet** (HTTP headers), **express-rate-limit** (brute-force protection), **Data Sanitization** (NoSQL injection & XSS prevention), and **HPP** (HTTP Parameter Pollution prevention).
*   **Payment Gateway Integration:** Integrated **Stripe** API for secure, seamless checkout sessions and payment processing for tour bookings.
*   **Image Processing & Uploads:** Engineered robust file upload capabilities using **Multer** and optimized images on the fly using **Sharp**.
*   **Email Communication:** Implemented automated email workflows using **Nodemailer** and Pug templates (e.g., welcome emails, password resets).
*   **Server-Side Rendering (SSR):** Built dynamic front-end views rendered server-side using the **Pug** templating engine for optimal SEO and fast initial page loads.

## 🛠️ Technology Stack

*   **Backend Framework:** Node.js, Express.js
*   **Language:** TypeScript
*   **Database:** MongoDB, Mongoose ODM
*   **Security:** JWT, bcryptjs, Helmet, Express Rate Limit, HPP
*   **Payments:** Stripe
*   **Templating Engine:** Pug
*   **File Handling & Optimization:** Multer, Sharp
*   **Emailing:** Nodemailer, Mailtrap

## 🧠 Architecture & Design Patterns

*   **MVC Architecture:** Follows the Model-View-Controller pattern for clear separation of concerns, improving maintainability and scalability.
*   **Global Error Handling:** Implemented a centralized error-handling middleware to catch and format asynchronous errors gracefully, avoiding unhandled promise rejections.
*   **Clean Code Practices:** Written in strict **TypeScript** to catch errors at compile-time and improve developer experience with strong typing and interfaces.

## 📦 Getting Started

### Prerequisites
*   Node.js (v16+)
*   MongoDB (Local or Atlas)
*   Stripe Account (for payments)

### Installation

1. Clone the repository
   ```bash
   git clone <your-repo-url>
   cd natours
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Set up Environment Variables
   Create a `config.env` file in the root directory and add the following variables:
   ```env
   NODE_ENV=development
   PORT=3000
   DATABASE=<your_mongodb_uri>
   PASSWORD=<your_db_password>
   JWT_SECRET=<your_jwt_secret>
   JWT_EXPIRES_IN=90d
   JWT_COOKIE_EXPIRES_IN=90
   STRIPE_SECRET_KEY=<your_stripe_secret_key>
   # Add your email configuration variables here
   ```

### Running the Application

*   **Development mode:**
    ```bash
    npm run dev
    ```
*   **Production mode:**
    ```bash
    npm run build:js
    npm start
    ```

## 📄 License
This project is licensed under the ISC License.
