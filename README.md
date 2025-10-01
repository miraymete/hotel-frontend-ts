# 🏨 Hotel Booking System - CS50 Final Project

A full-stack hotel booking application built with React/TypeScript frontend and Spring Boot backend.

## 🎯 Project Overview

This project solves a real-world problem by providing a comprehensive hotel booking platform where users can:
- Browse and search hotels
- Create accounts and manage profiles
- Save favorite hotels
- Book accommodations
- Admins can manage hotel inventory

## 🚀 Features

### Frontend (React + TypeScript)
- **Modern UI**: Built with React 19, TypeScript, and Tailwind CSS
- **Responsive Design**: Works on desktop, tablet, and mobile
- **User Authentication**: Login/Register with JWT tokens
- **Hotel Search**: Advanced filtering by price, stars, location
- **Favorites System**: Save and manage favorite hotels
- **Multi-language Support**: Turkish and English
- **Real-time Updates**: Dynamic content loading

### Backend (Spring Boot + Java)
- **RESTful API**: Clean, well-documented endpoints
- **JWT Security**: Secure authentication and authorization
- **Database Integration**: H2 (development) and PostgreSQL (production)
- **Admin Panel**: Hotel management for administrators
- **Search & Filtering**: Advanced hotel search capabilities
- **API Documentation**: Swagger/OpenAPI integration

## 🛠️ Technology Stack

### Frontend
- React 19.1.1
- TypeScript 5.8.3
- Vite 7.1.2
- Tailwind CSS 3.4.15
- React Router 7.8.2
- Axios 1.12.2
- Lucide React (Icons)

### Backend
- Java 21
- Spring Boot 3.5.3
- Spring Security
- Spring Data JPA
- JWT (JSON Web Tokens)
- H2 Database / PostgreSQL
- Maven
- Swagger/OpenAPI

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- Java 21+
- Maven 3.6+

### Backend Setup
```bash
cd jwtsecurity
mvn clean install
mvn spring-boot:run
```
Backend will run on: http://localhost:8080

### Frontend Setup
```bash
cd hotel-frontend-ts
npm install
npm run dev
```
Frontend will run on: http://localhost:5173

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/reset-password` - Password reset

### Hotels
- `GET /api/hotels` - List all hotels
- `GET /api/hotels/{id}` - Get hotel by ID
- `GET /api/hotels/search` - Search hotels with filters
- `GET /api/hotels/last-minute` - Get last-minute deals
- `POST /api/hotels` - Create hotel (Admin only)
- `PUT /api/hotels/{id}` - Update hotel (Admin only)
- `DELETE /api/hotels/{id}` - Delete hotel (Admin only)

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

## 🎨 Screenshots

[Add screenshots of your application here]

## 🏗️ Project Structure

```
hotel-frontend-ts/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── contexts/      # React contexts (Favorites, Language)
│   ├── lib/          # Utilities and services
│   └── assets/       # Static assets

jwtsecurity/
├── src/main/java/com/example/jwtsecurity/
│   ├── controller/    # REST controllers
│   ├── service/      # Business logic
│   ├── repository/   # Data access layer
│   ├── model/        # Entity models
│   ├── dto/          # Data transfer objects
│   └── security/     # Security configuration
```

## 🔐 Security Features

- JWT-based authentication
- Role-based access control (USER, ADMIN)
- Password encryption
- CORS configuration
- Input validation
- SQL injection prevention

## 🌟 Key Learning Outcomes

This project demonstrates mastery of:
- Full-stack web development
- Modern JavaScript/TypeScript
- React ecosystem and hooks
- RESTful API design
- Database design and ORM
- Authentication and security
- Responsive web design
- Version control with Git

## 🚀 Future Enhancements

- [ ] Payment integration
- [ ] Email notifications
- [ ] Hotel reviews and ratings
- [ ] Booking calendar
- [ ] Mobile app (React Native)
- [ ] Real-time chat support
- [ ] Advanced analytics dashboard

## 📝 License

This project is created for educational purposes as part of CS50 course.

## 👨‍💻 Author

[Your Name] - CS50 Student

---

**Note**: This project was developed as the final project for CS50 Introduction to Computer Science course, demonstrating comprehensive understanding of modern web development practices and full-stack application architecture.