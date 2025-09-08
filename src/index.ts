import 'dotenv/config';
import express from 'express';
import { Express } from 'express';
import { NodemailerAdapter } from './infrastructure/adapters/NodemailerAdapter';
import { SendEmailUseCase } from './core/usecases/SendEmailUseCase';
import { EmailController } from './infrastructure/controllers/EmailController';
const app: Express = express();
const cors = require('cors');
const allowedOrigins = [
  'https://www.vardump.com.ar',
  'https://vardump.com.ar',
  'http://localhost:4200' // Para desarrollo
];

app.use(cors({
  origin: function (origin: string | undefined, callback: (error: Error | null, allow?: boolean) => void) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));


app.use(express.json());

const  emailSender = new NodemailerAdapter();
const sendEmailUseCase = new SendEmailUseCase(emailSender);

const emailController = new EmailController(sendEmailUseCase);
app.use('/', emailController.router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

