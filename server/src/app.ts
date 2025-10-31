import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import logger from './services/logger.ts';
import userRoutes from './routes/users.routes.ts';
import authRoutes from './routes/auth.routes.ts';

const app = express();

app.use(helmet());
app.use(cors({
  origin: ['*']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`)
  next()
})

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'Paymaster Control'
  })
})

app.use('/auth', authRoutes)
app.use('/users', userRoutes)

export { app };
export default app;
