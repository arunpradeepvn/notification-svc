import { createLogger, format, transports } from 'winston';
import fs from 'fs';
import path from 'path';

const { combine, timestamp, printf, colorize } = format;

const logFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level}: ${message}`;
});

// Determine log directory based on environment
const logDir =
  process.env.NODE_ENV === 'production' ? '/tmp' : path.join(__dirname, '../../logs');

// Ensure log directory exists (only needed for non-production environments)
if (process.env.NODE_ENV !== 'production' && !fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

export const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    colorize(),
    logFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: path.join(logDir, 'app.log') }) // Write to /tmp/app.log in production
  ],
});
