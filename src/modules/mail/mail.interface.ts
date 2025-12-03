export interface MailOptions {
  to: string | string[];
  subject: string;
  body: string;
  html?: boolean;
}
