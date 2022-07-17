import express, { Response } from 'express';

export const router = express.Router();

router.use((_, res: Response) => {
  res.status(404).json({ message: 'Not found' });
});

