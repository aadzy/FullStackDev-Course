const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "volunteer_db",
  port: process.env.DB_PORT || 3306
});

// Create volunteers table if it doesn't exist
const createTable = async () => {
  try {
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
    await db.execute(createTableQuery);
    console.log('Volunteers table created or already exists');
  } catch (error) {
    console.error('Error creating table:', error);
  }
};

// Initialize database
createTable();

// POST endpoint for form submission
app.post("/api/volunteers", async (req, res) => {
  const {
    name,
    email,
    countryCode,
    contact,
    country,
    preferredRoles,
    volunteerReason,
  } = req.body;

  // Validate required fields
  if (!name || !email || !contact || !country || !volunteerReason) {
    return res.status(400).json({ 
      success: false, 
      message: "All required fields must be provided" 
    });
  }

  try {
    // Store in MySQL
    const [result] = await db.execute(
      "INSERT INTO volunteers (name, email, country_code, contact, country, preferred_roles, volunteer_reason) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        name,
        email,
        countryCode,
        contact,
        country,
        JSON.stringify(preferredRoles),
        volunteerReason,
      ]
    );

    // Send confirmation email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Volunteer Application Confirmation",
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
      success: true, 
      message: "Volunteer application submitted successfully",
      volunteerId: result.insertId
    });
  } catch (err) {
    console.error('Error submitting volunteer application:', err);
    
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ 
        success: false, 
        message: "An application with this email already exists" 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: "Internal server error" 
    });
  }
});

// GET endpoint to retrieve all volunteers (for admin purposes)
app.get("/api/volunteers", async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM volunteers ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching volunteers:', err);
    res.status(500).json({ 
      success: false, 
      message: "Internal server error" 
    });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
