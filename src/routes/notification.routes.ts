import { Router } from 'express';

import { sendNotification } from '../services/notification.service';

const router = Router();

router.post('/send', async (req, res, next) => {
  try {
    await sendNotification(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;

