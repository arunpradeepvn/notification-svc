import axios from 'axios';
import { Request, Response } from 'express';
import { Expo, ExpoPushMessage } from 'expo-server-sdk';

import { logger } from '../utils/logger';
import { NotificationPayload } from '../types/notification.types';
import { notificationSchema } from '../validation/notificationValidation';

export const sendNotification = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { to, title, body }: NotificationPayload = req.body;

  const { error } = notificationSchema.validate({ to, title, body });

  if (error) {
    res.status(400).json({
      error: error.details[0].message,
    });
    return;
  }

  if (!Expo.isExpoPushToken(to)) {
    logger.warn(`Invalid Expo push token: ${to}`);
    res.status(400).json({ error: 'Invalid Expo push token' });
    return;
  }

  const message: ExpoPushMessage[] = [{
    to,
    title,
    body,
    sound: 'default',
  }];

  try {
    const {
      data: {
        data: notificationResponseData = ''
      } = {}
    } = await axios.post('https://exp.host/--/api/v2/push/send', message, {
      headers: {
        'Content-Type': 'application/json'
      }
    }) || {};

    logger.info(`Notification sent to ${to}, title: ${title}`);
    res.status(200).json({ success: true, data: notificationResponseData });
  } catch (error: any) {
    logger.error(`Error sending notification to ${to}: ${error.message}`);
    res.status(500).json({ error: 'Failed to send notification' });
  }
};
