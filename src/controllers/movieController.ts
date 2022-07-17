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
}
