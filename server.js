import express from 'express';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory OTP storage (for production, use a database like Redis)
const otpStore = {};

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_ID,
    pass: process.env.MAIL_PASS,
  },
});

// Test email configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error configuring Nodemailer:', error);
  } else {
    console.log('Nodemailer configured successfully:', success);
  }
});

// Send OTP Endpoint
app.post('/send-otp', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    console.error('Email is required.');
    return res.status(400).json({ success: false, message: 'Email is required.' });
  }

  try {
    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = Date.now() + 5 * 60 * 1000; // OTP valid for 5 minutes
    otpStore[email] = { otp, expiry };

    // Email options
    const mailOptions = {
      from: process.env.MAIL_ID,
      to: email,
      subject: 'Your OTP for Signup',
      text: `Your OTP for signup is: ${otp}. It will expire in 5 minutes.`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log(`OTP sent to ${email}: ${otp}`);
    res.status(200).json({ success: true, message: 'OTP sent successfully.' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send OTP. Please check your email configuration and try again.',
      error: error.message, // Include error details for debugging
    });
  }
});

// Verify OTP Endpoint
app.post('/verify-otp', (req, res) => {
  const { email, otpEntered } = req.body;

  if (!email || !otpEntered) {
    console.error('Missing email or OTP:', req.body);
    return res.status(400).json({ success: false, message: 'Email and OTP are required.' });
  }

  const storedOtp = otpStore[email];
  if (!storedOtp) {
    console.error('No OTP found for:', email);
    return res.status(400).json({ success: false, message: 'OTP not found. Please request a new one.' });
  }

  const { otp, expiry } = storedOtp;
  if (otp !== otpEntered) {
    console.error('Invalid OTP for email:', email, 'Entered OTP:', otpEntered);
    return res.status(400).json({ success: false, message: 'Invalid OTP.' });
  }

  if (Date.now() > expiry) {
    console.error('OTP expired for email:', email);
    delete otpStore[email];
    return res.status(400).json({ success: false, message: 'OTP expired. Please request a new one.' });
  }

  console.log(`OTP verified successfully for ${email}`);
  delete otpStore[email];
  res.status(200).json({ success: true, message: 'OTP verified successfully.' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
