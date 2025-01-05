import { Router } from 'express';

import { send } from '../services/pushNotification.service';

const router = Router();

const queue: { req: any, res: any; }[] = [];
let processing = false;

const processNextRequest = async () => {
  if (queue.length > 0 && !processing) {
    processing = true;

    // Dequeue the next request
    const {
      req,
      res
    } = queue.shift()!;

    try {
      // Process the request
      await send(req, res);
    } catch (error) {
      res.status(500).json({ error: 'Failed to process notification' });
    } finally {
      processing = false;

      // Process the next request in the queue
      processNextRequest();
    }
  }
};

router.post('/send', async (req, res, next) => {
  // Enqueue the incoming request
  queue.push({ req, res });

  // Start processing the queue if not already processing
  processNextRequest();
});

export default router;

