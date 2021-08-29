const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  secure: true,
  port: 465,
  auth: {
    user: "liweisupertest@gmail.com",
    pass: "ZAQ!xsw2@test",
  },
});

const emailSender = (request, response) => {
  const { name, email, subject, message } = request.body;
  const mailOptions = {
    from: `'${name}' <${email}>`,
    to: "liweisupertest@gmail.com",
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
