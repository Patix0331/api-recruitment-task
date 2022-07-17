import express, { NextFunction, Request, Response } from 'express';
import { movieSchema } from '../schemas/movieSchema';

export const movies = express.Router();

function validateBody(req: Request, res: Response, next: NextFunction) {
  const validated = movieSchema.safeParse(req.body);
  if (!validated.success) {
    res.status(400).json(validated.error.flatten().fieldErrors);
  } else {
    next();
  }
}

movies.route('/')
  .post(validateBody, async (req: Request, res: Response) => {
    res.json(req.body);
  });

