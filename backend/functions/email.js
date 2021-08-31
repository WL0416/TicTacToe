const nodemailer = require("nodemailer");
const info = require("../info.json");

const transporter = nodemailer.createTransport({
  service: info.emailService,
  host: info.emailHost,
  secure: true,
  port: info.emailPort,
  auth: {
    user: info.emailUser,
    pass: info.emailPass,
  },
});

const emailSender = (request, response) => {
  const { name, email, subject, message } = request.body;
  const mailOptions = {
    from: `'${name}' <${email}>`,
    to: info.emailUser,
    subject: `${subject}`,
    html: `${message}`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      response.status(200).json({ status: "error" });
    } else {
      console.log(`Message sent: ${info.response}`);
      response.status(200).json(info.response);
    }
  });
};

module.exports = {
  emailSender,
};
