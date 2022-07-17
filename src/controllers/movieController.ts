import { repository } from "../repository/repository";
import { Movie } from "../schemas/movieSchema";

export async function addMovie(movie: Movie) {
  return repository.addMovie(movie);
}
