# Volunteer Form Application

This is a React application with a backend server that handles volunteer form submissions, stores data in MySQL database, and sends confirmation emails using nodemailer.

## Features

- Volunteer registration form with validation
- MySQL database storage
- Email confirmation using nodemailer
- Real-time form validation
- Responsive design with Tailwind CSS

## Setup Instructions

### 1. Database Setup

Create a MySQL database and table:

```sql
CREATE DATABASE volunteer_db;
USE volunteer_db;

CREATE TABLE volunteers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    country_code VARCHAR(10) NOT NULL,
    contact VARCHAR(20) NOT NULL,
    country VARCHAR(100) NOT NULL,
    preferred_roles JSON,
    volunteer_reason TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2. Environment Variables

Create a `.env` file in the root directory with the following variables:

```
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=volunteer_db
DB_PORT=3306

# Email Configuration (Gmail)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Server Configuration
PORT=5000
```

**Note for Gmail**: You need to use an App Password instead of your regular password. Enable 2-factor authentication and generate an App Password.

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Backend Server

```bash
npm run server
```

The server will run on `http://localhost:5000`

### 5. Start the React Development Server

In a new terminal:

```bash
npm run dev
```

The React app will run on `http://localhost:5173`

## API Endpoints

- `POST /api/volunteers` - Submit volunteer application
- `GET /api/volunteers` - Get all volunteer applications (admin)
- `GET /api/health` - Health check endpoint

## Form Fields

- Full Name (required)
- Email (required, unique)
- Contact Number with Country Code (required)
- Country (required)
- Preferred Roles (multiple selection)
- Volunteer Reason (required)

## Email Template

The application sends a beautifully formatted HTML email with:
- Application confirmation
- Submitted details
- Next steps information
- Contact information

## Technologies Used

- **Frontend**: React, Tailwind CSS, Vite
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Email**: Nodemailer
- **Validation**: Client-side and server-side validation
