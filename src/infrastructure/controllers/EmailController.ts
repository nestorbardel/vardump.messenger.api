import { Request, Response, Router } from "express";
import { SendEmailUseCase } from "../../core/usecases/SendEmailUseCase";
import { Email } from "../../core/domain/Email";

export class EmailController {
    public router: Router = Router();
    private sendEmailUseCase: SendEmailUseCase;

    constructor(sendEmailUseCase: SendEmailUseCase) {
        this.sendEmailUseCase = sendEmailUseCase;
        this.setupRoutes();
    }

    private setupRoutes() {
        this.router.post('/send-email', (req, res) => this.sendEmail(req, res));
    }

    private async sendEmail(req: Request, res: Response) {
        try {
            const { to, subject, body } = req.body;
            if (!to || !subject || !body) {
                return res.status(400).send({ message: 'Todos los campos son obligatorios' });
            }

            //validar formato de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(to)) {
                return res.status(400).send({ message: 'Formato de email invalido' });
            }

            const email = new Email(to, subject, body);
            await this.sendEmailUseCase.execute(email);
            res.status(200).send({ message: 'Email sent successfully' });
        } catch (error) {
            console.error('Failed to send email: ', error);
            res.status(500).send({ message: 'Failed to send email' });
        }
    }
}