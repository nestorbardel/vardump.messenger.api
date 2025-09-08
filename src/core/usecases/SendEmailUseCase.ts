import { Email } from "../domain/Email";
import { EmailSenderPort } from "../ports/EmailSenderPort";

export class SendEmailUseCase {
    constructor(private emailSenderPort: EmailSenderPort){}

    async execute(email: Email): Promise<void>{
        console.log(`Sending email to ${email.to}...`);
        await this.emailSenderPort.sendEmail(email.to, email.subject, email.body);
        console.log(`Email sent successfully`);
    }
}