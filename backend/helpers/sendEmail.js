import sgMail from '@sendgrid/mail'
import { confirmAccountHtmlEmail, resetPasswordHtmlEmail } from './htmlMail.js';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//ES6
export const sendEmail = (href, toUser, subject, typeEmail) => {
    let html;

    if(typeEmail === 'confirm'){
      html = confirmAccountHtmlEmail(href);
    }else{
      html = resetPasswordHtmlEmail(href);
    }

    const msg = {
        to: toUser,
        from: 'UpTask <leodev_@outlook.com',
        subject: subject,
        html: html,
      };

    return sgMail.send(msg)
          .then(() => {}, error => {
              console.error(error);

              if (error.response) {
              console.error(error.response.body)
              }
          });
}