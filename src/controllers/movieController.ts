import { repository } from "../repository/repository";
import { Genre, Movie } from "../schemas/movieSchema";
import { durationHelper, genresHelper, random, removeDuplicates } from "./helpers";

export async function addMovie(movie: Movie) {
  return repository.addMovie(movie);
}

export async function randomMovie() {
  const movies = await repository.movies();
  return random(movies);
}

export async function durationMovies(duration: number) {
  const movies = await repository.movies();
  const filteredMovies = durationHelper(movies, duration);
  return random(filteredMovies)
}

export async function genresMovies(genres: Genre[]) {
  const movies = await repository.movies();
  return genresHelper(movies, genres);
}

export async function durationAndGenresMovies(duration: number, genres: Genre[]) {
  const movies = await repository.movies();
  const genresFiltered = genresHelper(movies, genres);
  const filteredMovies = durationHelper(genresFiltered, duration);
  return filteredMovies;
}
