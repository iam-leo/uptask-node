import sgMail from '@sendgrid/mail'
import { htmlEmail } from './htmlMail.js';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//ES6
export const sendEmail = (href, toUser, subject) => {
    const html = htmlEmail(href);

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

