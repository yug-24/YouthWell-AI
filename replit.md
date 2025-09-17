# YouthWell AI - Mental Wellness Platform

## Overview

YouthWell AI is a comprehensive mental wellness platform designed specifically for teens aged 13-18. It provides a safe, confidential space where young users can access AI-powered mental health support, practice mindfulness techniques, maintain daily journals, track progress, and access crisis resources. The platform supports both anonymous usage and email-based authentication, prioritizing user privacy and accessibility.

The application combines modern web technologies with thoughtful mental health features, including mood tracking, breathing exercises, meditation tools, AI chat support, and comprehensive resource directories. It's built as a full-stack TypeScript application with a React frontend and Express backend.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern component patterns
- **Routing**: React Router DOM v7 for client-side navigation and protected routes
- **State Management**: React Context API for global state (authentication, theme management)
- **Styling**: Tailwind CSS with custom design system, dark mode support, and responsive design
- **Build Tool**: Vite for fast development and optimized production builds
- **Chart Visualization**: Chart.js with react-chartjs-2 for progress tracking and mood analytics

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript for type safety and developer experience
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Authentication**: JWT-based authentication with support for both anonymous and email-based users
- **Security**: Helmet.js for security headers, CORS configuration, rate limiting, and bcrypt for password hashing
- **File Handling**: Multer for media uploads (audio/video files)
- **Validation**: Joi for comprehensive input validation and sanitization

### Database Design
- **Schema**: PostgreSQL with tables for users, journals, progress tracking, media files, and chat sessions
- **User System**: Flexible authentication supporting anonymous users and email registration
- **Data Relationships**: Proper foreign key relationships between users and their data
- **Privacy**: All user data is scoped to individual accounts with proper isolation

### Development Environment
- **Development Server**: Custom Vite configuration with port 5000 for frontend
- **Code Quality**: ESLint with TypeScript rules, React hooks linting, and consistent formatting
- **Environment Management**: dotenv for configuration management
- **Database Migrations**: Drizzle Kit for schema management and migrations

### Key Architectural Decisions

**Dual Authentication System**: Supports both anonymous users (for immediate access) and email-based registration (for data persistence across sessions). This removes barriers for teens who may be hesitant to provide personal information initially.

**Privacy-First Design**: All journal entries, chat sessions, and progress data are private by default. User data is strictly isolated and never shared.

**Modular Route Structure**: Backend API is organized into logical modules (auth, journal, chat, progress, media) for maintainability and clear separation of concerns.

**Type-Safe Database Layer**: Uses Drizzle ORM with TypeScript for compile-time query validation and automatic type inference, reducing runtime errors.

**Responsive UI Framework**: Tailwind CSS provides a consistent design system with built-in dark mode support and responsive breakpoints optimized for both mobile and desktop usage.

**Security Middleware Stack**: Implements multiple security layers including rate limiting, CORS policies, content security policies, and secure session management.

## External Dependencies

### Database & Storage
- **Neon Database**: Serverless PostgreSQL database with connection pooling
- **Local File Storage**: Multer-based file uploads for audio/video content stored locally

### Authentication & Security
- **JWT (jsonwebtoken)**: Token-based authentication system
- **bcryptjs**: Password hashing and verification
- **express-session**: Session management with PostgreSQL store
- **connect-pg-simple**: PostgreSQL session store for Express

### Development & Deployment
- **Vite**: Frontend build tool and development server
- **TypeScript**: Static type checking across frontend and backend
- **ESLint**: Code quality and consistency enforcement

### UI & Visualization
- **Lucide React**: Icon library for consistent visual elements
- **Chart.js**: Data visualization for mood tracking and progress analytics
- **Tailwind CSS**: Utility-first CSS framework with dark mode support

### Backend Services
- **Express.js**: Web framework with comprehensive middleware ecosystem
- **Helmet.js**: Security headers and content security policy
- **CORS**: Cross-origin resource sharing configuration
- **express-rate-limit**: API rate limiting and abuse prevention
- **Joi**: Input validation and data sanitization

### Development Tools
- **Nodemon**: Development server auto-restart
- **Drizzle Kit**: Database schema management and migrations
- **ws**: WebSocket support for real-time features