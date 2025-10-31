import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import logger from './services/logger.ts';
import authRoutes from './routes/auth.routes.ts';
import apiRoutes from './routes/api.routes.ts';

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

app.use('/api/auth', authRoutes)
app.use('/api/v1', apiRoutes)

export { app };
export default app;
