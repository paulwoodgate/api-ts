/* eslint-disable no-console */

import nodemailer from 'nodemailer';
import { MessageDocument } from '../data/message-document';
import * as SMTPTransport from 'nodemailer/lib/smtp-transport';

export default {
  sendEmail: async (msg: MessageDocument) => {
    try {
      const recipients = process.env.EMAIL_RECIPIENTS
        ? `${process.env.EMAIL_USER}, ` + process.env.EMAIL_RECIPIENTS
        : process.env.EMAIL_USER;

      const options: SMTPTransport.Options = {
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      };
      const transporter = nodemailer.createTransport({
        options,
        tls: {
          rejectUnauthorized: false,
        },
      });

      await transporter.sendMail({
        from: `${msg.name} <${msg.email}>`,
        to: recipients,
        subject: `Message from ${msg.name}`,
        html: msg.message,
      });

      return true;
    } catch (error) {
      console.log('Error', error);
      return false;
    }
  },
};
