import express, { Response } from 'express';
import { movies } from './movieRoute';

export const router = express.Router();

router.use('/movies', movies);
router.use((_, res: Response) => {
  res.status(404).json({ message: 'Not found' });
});
