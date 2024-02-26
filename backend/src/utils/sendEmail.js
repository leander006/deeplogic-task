const nodemailer = require("nodemailer");
const {
  HOST,
  SECURE,
  EMAIL_PORT,
  SERVICE,
  USERNAME,
  PASSWORD,
} = require("../config/serverConfig");
module.exports = async (email, subject, text) => {
  try {
    var transporter = nodemailer.createTransport({
      service: SERVICE,
      auth: {
        user: USERNAME,
        pass: PASSWORD,
      },
    });

    var mailOptions = {
      from: USERNAME,
      to: email,
      subject: subject,
      text: text,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    console.log("Something went wrong");
    console.log(error.message);
  }
};
