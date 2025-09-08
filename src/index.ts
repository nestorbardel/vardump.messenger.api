import 'dotenv/config';
import express from 'express';
import { Express } from 'express';
import { NodemailerAdapter } from './infrastructure/adapters/NodemailerAdapter';
import { SendEmailUseCase } from './core/usecases/SendEmailUseCase';
import { EmailController } from './infrastructure/controllers/EmailController';

const app: Express = express();
app.use(express.json());

const  emailSender = new NodemailerAdapter();
const sendEmailUseCase = new SendEmailUseCase(emailSender);

const emailController = new EmailController(sendEmailUseCase);
app.use('/', emailController.router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

