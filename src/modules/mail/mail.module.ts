import { Module, Global } from '@nestjs/common';
import { NodeMailerService } from './nodemailer.service';
import { MailService } from './mail.service';

@Global()
@Module({
  providers: [
    {
      provide: MailService,
      useClass: NodeMailerService, // You can create a new service for different providers and use it here
    },
  ],
  exports: [MailService],
})
export class MailModule {}
