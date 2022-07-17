import { readFile, writeFile } from "fs/promises";
import { Genre, Movie } from "../schemas/movieSchema";

const fileUrl = process.env.DB_URL || './data/db.json';

export type MovieData = Movie & {
  id: number;
  year: string;
  runtime: string;
}

type FileData = {
  genres: Genre[];
  movies: MovieData[];
};

export class Repository {
  #cached: FileData | undefined;
  async #loadData() {
    if (this.#cached) {
      return this.#cached;
    }
    const data = await readFile(fileUrl, 'utf8');
    this.#cached = JSON.parse(data);
    return this.#cached!;
  }
  async #syncData() {
    const data = await this.#loadData();
    await writeFile(fileUrl, JSON.stringify(data, null, 4));
  }
  async data(): Promise<FileData> {
    return this.#loadData();
  }
  async genres() {
    const data = await this.#loadData();
    return data.genres;
  }
  async movies() {
    const data = await this.#loadData();
    return data.movies;
  }
  async findMovie(predicate: (movie: MovieData) => boolean) {
    const data = await this.movies();
    return data.find(movie => predicate(movie));
  }
  async addMovie(movie: Movie) {
    const data = await this.#loadData();
    const nextId = 1 + data.movies.length;
    const newMovie = { ...movie, id: nextId };
    data.movies.push(newMovie as MovieData);
    await this.#syncData();
    return newMovie;
  }
}

export const repository = new Repository();
