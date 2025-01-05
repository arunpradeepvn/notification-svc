import { Router } from 'express';

import { expo } from '../utils/expoClient';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const isExpoHealthy = expo ? true : false;

    res.status(200).json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      dependencies: {
        expoServer: isExpoHealthy ? 'healthy' : 'unhealthy',
      },
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'unhealthy',
      error: error.message,
    });
  }
});

export default router;
