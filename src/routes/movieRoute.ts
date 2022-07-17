import express, { NextFunction, Request, Response } from 'express';
import { addMovie, randomMovie } from '../controllers/movieController';
import { movieSchema } from '../schemas/movieSchema';
import { Query, querySchema } from '../schemas/querySchema';

export const movies = express.Router();

function validateBody(req: Request, res: Response, next: NextFunction) {
  const validated = movieSchema.safeParse(req.body);
  if (!validated.success) {
    res.status(400).json(validated.error.flatten().fieldErrors);
  } else {
    next();
  }
}

function validateQuery(req: Request, res: Response, next: NextFunction) {
  const validated = querySchema.safeParse(req.query);
  if (!validated.success) {
    res.status(400).json(validated.error.flatten().fieldErrors);
  } else {
    next();
  }
}

async function queryDispatcher(query: Query) {
  if (query.duration === undefined && query.genres === undefined) {
    return randomMovie();
  }
}

movies.route('/')
  .post(validateBody, async (req: Request, res: Response) => {
    const movie = await addMovie(movieSchema.parse(req.body));
    res.json(movie);
  })
  .get(validateQuery, async (req: Request, res: Response) => {
    const movie = await queryDispatcher(querySchema.parse(req.query));
    res.json(movie)
  });

