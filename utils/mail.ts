import nodemailer from 'nodemailer';
import pug from 'pug';
import type { IUser } from '../interface/userInterface.js';
;


export default class Email{
  to:string;
  firstName:string;
  url:string;
  from:string;
  constructor(user:IUser,url:string){
    this.to=user.email;
    this.firstName =user.name.split(' ')[0]??'';
    this.url=url;
    this.from=`NaTours <${process.env.EMAIL_FROM}>`;
  }

  newTransport(){
    if(process.env.NODE_ENV==='production'){
     return nodemailer.createTransport(
      {
        host: process.env.SENDGRID_HOST,
        port: Number(process.env.SENDGRID_PORT),
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD
        }
      }
     )
    }else{
      return nodemailer.createTransport(
  {
     host: process.env.EMAIL_HOST,
     port: Number(process.env.EMAIL_PORT),
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
  }
);
    }

  }

  async send(template:string,subject:string){
    //1) Render HTML based on a pug template
    const html= pug.renderFile(`${__dirname}/../views/emails/${template}.pug`,{
      firstName:this.firstName,
      url:this.url,
      subject
    });

    //2) Define email options
 const mailOptions={
        from: this.from ,
        to:this.to,
        html,
        subject,
        // text:htmlToText.htmlToText(html)
    };
  
    await this.newTransport().sendMail(mailOptions);
  }

    async sendWelcome() {
    await this.send('welcome', 'Welcome to the Natours Family!');
  }
  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token (valid for only 10 minutes)'
    );
  }
}
