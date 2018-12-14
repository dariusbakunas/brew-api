import sgMail from '@sendgrid/mail';
import ejs from 'ejs';
import path from 'path';
import logger from '../logger';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

class EmailSender {
  sendActivationEmail(email, token) {
    return new Promise((resolve, reject) => {
      const url = `${process.env.BASE_URL}/activate?token=${token}`;

      logger.info(`Sending activation email to ${email}`);

      ejs.renderFile(path.join(__dirname, '../templates/activationEmail.ejs'), { url }, {}, (fileErr, str) => {
        if (fileErr) {
          logger.error(`Unable to load activation email template: ${fileErr.message}`);
          return reject(fileErr);
        }

        const msg = {
          to: email,
          from: 'noreply@brew.geekspace.us',
          subject: 'Verify Your Email Address',
          text: `Please go to this url to activate your account: ${url}`,
          html: str,
        };

        return sgMail.send(msg)
          .then((response) => {
            logger.info('Activation email sent successfully');
            resolve(response);
          })
          .catch((err) => {
            logger.error(`Failed sending activation email: ${err.message}`);
            reject(err);
          });
      });
    });
  }
}

export default EmailSender;
