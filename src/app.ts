import express from 'express';

import pushNotificationRoutes from './routes/pushNotification.routes';
import healthRoutes from './routes/health.routes';
import rootRoutes from './routes/root.routes';
import { logger } from './utils/logger';

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  logger.info(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Register routes
app.get('/', rootRoutes);

app.use('/api/health', healthRoutes);

app.use('/api/pushNotification', pushNotificationRoutes);

// Error-handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error(`Error occurred: ${err.message}`);
  res.status(500).json({ error: err.message || 'Internal server error' });
});

export default app;
