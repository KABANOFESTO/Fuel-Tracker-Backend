const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for 587
  auth: {
    user: process.env.EMAIL_USER || "MISSING_EMAIL",
    pass: process.env.EMAIL_PASS || "MISSING_PASSWORD",
  },
});

// Debug missing credentials
console.log("Email User:", process.env.EMAIL_USER);
console.log("Email Pass:", process.env.EMAIL_PASS ? "********" : "MISSING");

const sendWelcomeEmail = async (email, name, password) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to Our System!",
      html: `
        <p>Hello <strong>${name}</strong>,</p>
        <p>Your account has been successfully created.</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Temporary Password:</strong> ${password}</p>
        <p>Please change your password after logging in.</p>
        <p><a href="http://localhost:5173/login">Click here to log in</a></p>
        <p>Best Regards,<br/>Your Company</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`📩 Welcome email sent to ${email}`);
  } catch (error) {
    console.error("❌ Error sending welcome email:", error);
  }
};

const sendEmailToResetPassword = async (email, resetToken) => {
  try {
    const resetLink = `http://localhost:5173/reset-password?token=${resetToken}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Your Password",
      html: `
        <p>Hello,</p>
        <p>We received a request to reset your password. Click the link below to reset it:</p>
        <p><a href="${resetLink}" target="_blank">Reset Password</a></p>
        <p>If you didn't request this, please ignore this email.</p>
        <p>Best Regards,<br/>Your Company</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`📩 Password reset email sent to ${email}`);
  } catch (error) {
    console.error("❌ Error sending reset email:", error);
  }
};

module.exports = { sendWelcomeEmail, sendEmailToResetPassword };
