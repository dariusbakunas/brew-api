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

      const template = path.join(__dirname, './templates/activationEmail.ejs');
      logger.info(`Loading email template from: ${template}`);

      ejs.renderFile(template, { url }, {}, (fileErr, str) => {
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

  sendInvitationEmail(email, invitationCode) {
    return new Promise((resolve, reject) => {
      // TODO: pass the code to login url and pre-populate registration form
      const url = `${process.env.BASE_URL}/login`;

      logger.info(`Sending invitation email to ${email}`);

      const template = path.join(__dirname, './templates/invitationEmail.ejs');

      ejs.renderFile(template, { url, code: invitationCode }, {}, (fileErr, str) => {
        if (fileErr) {
          logger.error(`Unable to load invitation email template: ${fileErr.message}`);
          return reject(fileErr);
        }

        const msg = {
          to: email,
          from: 'noreply@brew.geekspace.us',
          subject: 'Brew Beer Invitation',
          text: `Please go to this url to register your account: ${url}, use this code: ${invitationCode}`,
          html: str,
        };

        return sgMail.send(msg)
          .then((response) => {
            logger.info('Invitation email sent successfully');
            resolve(response);
          })
          .catch((err) => {
            logger.error(`Failed sending invitation email: ${err.message}`);
            reject(err);
          });
      });
    });
  }
}

export default EmailSender;
