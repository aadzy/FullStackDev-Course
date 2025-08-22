import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Database Configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'volunteer_db',
  port: process.env.DB_PORT || 3306
};

// Create MySQL connection pool
const pool = mysql.createPool(dbConfig);

// Nodemailer configuration
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS // Use app password for Gmail
  }
});

// Create volunteers table if it doesn't exist
const createTable = async () => {
  try {
    const connection = await pool.getConnection();
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS volunteers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        country_code VARCHAR(10) NOT NULL,
        contact VARCHAR(20) NOT NULL,
        country VARCHAR(100) NOT NULL,
        preferred_roles JSON,
        volunteer_reason TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    await connection.execute(createTableQuery);
    connection.release();
    console.log('Volunteers table created or already exists');
  } catch (error) {
    console.error('Error creating table:', error);
  }
};

// Initialize database
createTable();

// API Routes
app.post('/api/volunteers', async (req, res) => {
  try {
    const {
      name,
      email,
      countryCode,
      contact,
      country,
      preferredRoles,
      volunteerReason
    } = req.body;

    // Validate required fields
    if (!name || !email || !contact || !country || !volunteerReason) {
      return res.status(400).json({ error: 'All required fields must be provided' });
    }

    // Insert volunteer data into database
    const connection = await pool.getConnection();
    const insertQuery = `
      INSERT INTO volunteers (name, email, country_code, contact, country, preferred_roles, volunteer_reason)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    
    const [result] = await connection.execute(insertQuery, [
      name,
      email,
      countryCode,
      contact,
      country,
      JSON.stringify(preferredRoles),
      volunteerReason
    ]);
    
    connection.release();

    // Send confirmation email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Volunteer Application Confirmation',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Volunteer Application Confirmation</h2>
          <p>Dear ${name},</p>
          <p>Thank you for your interest in volunteering with us! We have received your application and are excited to have you on board.</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151;">Application Details:</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Contact:</strong> ${countryCode} ${contact}</p>
            <p><strong>Country:</strong> ${country}</p>
            <p><strong>Preferred Roles:</strong> ${preferredRoles.join(', ') || 'None specified'}</p>
          </div>
          
          <p>We will review your application and get back to you within 3-5 business days with further instructions.</p>
          
          <p>If you have any questions, please don't hesitate to contact us.</p>
          
          <p>Best regards,<br>The Volunteer Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({
      message: 'Volunteer application submitted successfully',
      volunteerId: result.insertId
    });

  } catch (error) {
    console.error('Error submitting volunteer application:', error);
    
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'An application with this email already exists' });
    }
    
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all volunteers (for admin purposes)
app.get('/api/volunteers', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT * FROM volunteers ORDER BY created_at DESC');
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error('Error fetching volunteers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
