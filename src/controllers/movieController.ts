import { repository } from "../repository/repository";
import { Genre, Movie } from "../schemas/movieSchema";
import { random, removeDuplicates } from "./helpers";

export async function addMovie(movie: Movie) {
  return repository.addMovie(movie);
}

export async function randomMovie() {
  const movies = await repository.movies();
  return random(movies);
}

export async function durationMovies(duration: number) {
  const movies = await repository.movies();
  const filteredMovies = movies.filter(movie => {
    const runtime = parseInt(movie.runtime);
    return runtime > duration - 10 && runtime < duration + 10;
  });
  return random(filteredMovies)
}

export async function genresMovies(genres: Genre[]) {
  const uniqued = [...new Set(genres)];
  const movies = await repository.movies();
  const filteredMovies = movies.filter(movie => {
    return uniqued.some(genre => movie.genres.includes(genre));
  });
  return removeDuplicates(filteredMovies);
}
