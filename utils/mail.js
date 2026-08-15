const nodeMailer = require('nodemailer');
const sendEmail= async options=>{
    //1) Create a transporter
    const transport = nodeMailer.createTransport(
  {
     host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
  }
);

    //2) Define the email options
    const mailOptions={
        from: "NaTours <kerolus@example.com>" ,
        to:options.email,
        subject:options.subject,
        text:options.message
    };
    //3) Actually send the email
    await transport.sendMail(mailOptions);
};

module.exports=sendEmail;