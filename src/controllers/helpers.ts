import { MovieData } from "../repository/repository";
import { Genre } from "../schemas/movieSchema";

export function random(movies: MovieData[]) {
  return movies[Math.floor(Math.random() * movies.length)];
}

export function removeDuplicates(movies: MovieData[]) {
  return movies.filter((v, i, a) => a.findIndex(v2 => v2.title === v.title) === i)
}

export function durationHelper(movies: MovieData[], duration: number) {
  const filteredMovies = movies.filter(movie => {
    const runtime = parseInt(movie.runtime);
    return runtime > duration - 10 && runtime < duration + 10;
  });
  return filteredMovies;
}

export function genresHelper(movies: MovieData[], genres: Genre[]) {
  const uniqued = [...new Set(genres)];
  const filteredMovies = movies.filter(movie => {
    return uniqued.some(genre => movie.genres.includes(genre));
  });
  return removeDuplicates(filteredMovies);
}

export function sortByGenres(movies: MovieData[], genres: Genre[]) {
  return movies.sort((a, b) => {
    const alen = genres.reduce((sum, genre) => sum + (a.genres.includes(genre) ? 1 : 0), 0);
    const blen = genres.reduce((sum, genre) => sum + (b.genres.includes(genre) ? 1 : 0), 0);
    if (alen > blen) {
      return -1;
    }
    if (alen === blen) {
      return 0;
    }
    return 1;
  });
}
