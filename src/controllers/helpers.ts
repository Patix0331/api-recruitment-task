import { MovieData } from "../repository/repository";

export function random(movies: MovieData[]) {
  return movies[Math.floor(Math.random() * movies.length)];
}

export function removeDuplicates(movies: MovieData[]) {
  return movies.filter((v, i, a) => a.findIndex(v2 => v2.title === v.title) === i)
}
