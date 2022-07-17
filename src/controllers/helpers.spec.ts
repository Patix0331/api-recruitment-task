import { repository } from "../repository/repository";
import { Genre } from "../schemas/movieSchema";
import { durationHelper, genresHelper } from "./helpers";

async function loadMovies() {
  const movies = await repository.movies().then(movies => movies.slice(0, 10));
  return movies;
}

describe("controller helpers", () => {
  it("are movies updated", async () => {
    const movies = await loadMovies();
    expect(movies).toMatchSnapshot();
  });
  it("filter by genres", async () => {
    const movies = await loadMovies();
    const genres: Genre[] = ["Comedy"];
    const filtered = genresHelper(movies, genres);
    genres.push("Comedy");
    const filtered2 = genresHelper(movies, genres);
    expect(filtered).toMatchSnapshot();
    expect(filtered2).toHaveLength(filtered.length);
  });
  it("filter by duration", async () => {
    const movies = await loadMovies();
    const duration = 90;
    const filtered = durationHelper(movies, duration);
    expect(filtered).toMatchSnapshot();
    expect(filtered.length === durationHelper(movies, duration + 30).length).toBe(false);
  });
});
