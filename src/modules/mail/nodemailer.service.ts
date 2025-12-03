import { Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';
import { MailService } from './mail.service';
import { MailOptions } from './mail.interface';

@Injectable()
export class NodeMailerService extends MailService {
  private transporter;

  constructor() {
    super();
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: !!process.env.SMTP_SECURE,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async send(options: MailOptions): Promise<void> {
    await this.transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: options.to,
      subject: options.subject,
      text: options.body,
      html: options.html ? options.body : undefined,
    });
  }
}
