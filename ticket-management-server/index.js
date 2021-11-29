import dotenv from 'dotenv'
import express from 'express';
import cors from 'cors';
import ticketRouter from './routes/ticketRoutes';

dotenv.config();
var app = express();
app.use(express.json());

const corsConfig = {
  credentials: true,
  origin: true,
};
app.use(cors(corsConfig)); //To enable CORS
  
app.use('/ticket', ticketRouter); //Redirecting to any url having <server-name>/ticket

export default app;