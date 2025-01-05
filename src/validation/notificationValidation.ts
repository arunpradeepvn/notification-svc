import Joi from 'joi';

import { NotificationPayload } from '../types/notification.types';

// api/notifications/send
export const notificationSchema = Joi.object<NotificationPayload>({
  to: Joi.string().required().label('Recipient Expo Push Token'),
  title: Joi.string().required().label('Notification Title'),
  body: Joi.string().required().label('Notification Body'),
});
