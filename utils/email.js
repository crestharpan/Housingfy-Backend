const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  //1 CREATE A TRANSPORTER
  console.log(process.env.EMAIL_HOST, process.env.EMAIL_PORT);
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  if (sendEmail) console.log('connected');
  //2 DEFINE THE OPTIONS
  const emailOptions = {
    from: 'Arpan Shrestha <arpan@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  //3 SEND THE EMAIL
  await transporter.sendMail(emailOptions); //this returns a promise
};

module.exports = sendEmail;
