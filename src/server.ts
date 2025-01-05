import dotenv from 'dotenv';

import app from './app';
import { logger } from './utils/logger';

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`| Notification SVC is running on ${PORT} |`);
});
