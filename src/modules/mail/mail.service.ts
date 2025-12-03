import { MailOptions } from './mail.interface';

export abstract class MailService {
  abstract send(options: MailOptions): Promise<void>;
}
