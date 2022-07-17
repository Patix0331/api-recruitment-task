import express, { Request, Response } from 'express';
import { movieSchema } from '../schemas/movieSchema';

export const movies = express.Router();

movies.route('/')
  .post(async (req: Request, res: Response) => {
    const movie = await movieSchema.safeParseAsync(req.body);
    if (movie.success) {
      res.json(movie.data);
    } else {
      res.json(movie.error.flatten().fieldErrors);
    }
  });

