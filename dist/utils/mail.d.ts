import nodemailer from 'nodemailer';
import type { IUser } from '../interface/userInterface.js';
export default class Email {
    to: string;
    firstName: string;
    url: string;
    from: string;
    constructor(user: IUser, url: string);
    newTransport(): nodemailer.Transporter<import("nodemailer/lib/smtp-transport/index.js").SentMessageInfo, import("nodemailer/lib/smtp-transport/index.js").Options>;
    send(template: string, subject: string): Promise<void>;
    sendWelcome(): Promise<void>;
    sendPasswordReset(): Promise<void>;
}
//# sourceMappingURL=mail.d.ts.map