import sgMail from '@sendgrid/mail';
import ejs from 'ejs';
import path from 'path';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

class EmailSender {
  sendActivationEmail(email, token) {
    const url = `${process.env.BASE_URL}/activate?token=${token}`;

    ejs.renderFile(path.join(__dirname, '../templates/activationEmail.ejs'), { url }, {}, (err, str) => {
      if (err) {
        console.error(err);
        return;
      }

      const msg = {
        to: email,
        from: 'noreply@brew.geekspace.us',
        subject: 'Verify Your Email Address',
        text: 'Please click this link to activate your account: ',
        html: str,
      };

      sgMail.send(msg);
    });
  }
}

export default EmailSender;
