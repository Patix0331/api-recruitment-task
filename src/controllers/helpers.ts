import { MovieData } from "../repository/repository";

export function random(movies: MovieData[]) {
  return movies[Math.floor(Math.random() * movies.length)];
}
