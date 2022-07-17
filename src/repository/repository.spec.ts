import { Repository } from "./repository";

describe("repository", () => {
  it("are genres updated", async () => {
    const repository = new Repository();
    const genres = await repository.genres();
    expect(genres).toMatchSnapshot();
  });
  it("find movie", async () => {
    const repository = new Repository();
    const movie = await repository.findMovie(movie => movie.id === 100);
    expect(movie).toMatchSnapshot();
  });
});
