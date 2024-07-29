import nodeMalier from "nodemailer";

export const sendEmail = async ({ email, subject, message }) => {
  const transport = nodeMalier.createTransport({
    host: process.env.SMTP_HOST,
    service: process.env.SMTP_SERVICE,
    port: parseInt(process.env.SMTP_PORT, 10),

    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  const options = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: subject,
    text: message,
  };
  try {
    await transport.sendMail(options);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
