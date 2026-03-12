import { config } from "dotenv";
config({ path: ".env" });
import nodemailer from "nodemailer";

export async function sendTestEmail(recipientEmail, otp) {
  // Create a transporter
  const transporter = nodemailer.createTransport({
    service: "Ethereal",
    auth: {
      user: process.env.TEST_ETHEREAL_USER,
      pass: process.env.TEST_ETHEREAL_PASS,
    },
  });

  // Send a test message
  const info = await transporter.sendMail({
    from: `"Test App" <${process.env.TEST_ETHEREAL_USER}>`,
    to: recipientEmail,
    subject: "Hello from Ethereal!",
    text: "This message was sent using Ethereal.",
    html: `<h1>${otp}</h1>`,
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview: %s", nodemailer.getTestMessageUrl(info));
}
