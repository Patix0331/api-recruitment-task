import { repository } from "../repository/repository";
import { Movie } from "../schemas/movieSchema";

export async function addMovie(movie: Movie) {
  return repository.addMovie(movie);
}

export async function randomMovie() {
  const movies = await repository.movies();
  return movies[Math.floor(Math.random() * movies.length)];
}
