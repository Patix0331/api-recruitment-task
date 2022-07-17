import { repository } from "../repository/repository";
import { Movie } from "../schemas/movieSchema";
import { random } from "./helpers";

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
