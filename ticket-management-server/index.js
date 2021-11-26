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
app.use(cors(corsConfig));

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
  });
  
app.use('/ticket', ticketRouter);