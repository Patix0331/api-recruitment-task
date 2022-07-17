import { Genre, Movie, movieSchema } from "./movieSchema";

describe("movies", () => {
  it("success", () => {
    expect(movie().validate()).toBe(true);
  });
  it("genres", () => {
    expect(movie().genres(["a", "b"]).validate()).toBe(false);
    expect(movie().genres(["Musical", "Sport"]).validate()).toBe(true);
    expect(movie().genres(["Musical", "Sport", "Sport"]).build().genres).toHaveLength(2);
    expect(movie().genres(["Musical", "Musical", "Sport", "Sport"]).build().genres).toHaveLength(2);
    expect(movie().genres(['a', 'a', 'b', 'b', 'c']).build().genres).toHaveLength(3);
  });
  it("title required string <= 255 characters", () => {
    const titles: [any, boolean][] = [
      [undefined, false],
      [{}, false],
      [NaN, false],
      ["", true],
      ["Good Title", true],
      ["Bad".repeat(260 / 3), false],
      ["A".repeat(256), false],
      ["A".repeat(255), true],
    ];
    titles.forEach(([title, expected]) => {
      expect(movie().title(title).validate()).toBe(expected);
    });
  });
  it("year required number", () => {
    const years: [any, boolean][] = [
      [undefined, false],
      [NaN, false],
      [{}, false],
      [Infinity, true],
      [-Infinity, true],
      [0, true],
      [2137, true],
      ["0", true],
      ["2137", true],
      ["123abc", false],
      ["foobar", false],
    ];
    years.forEach(([year, expected]) => {
      expect(movie().year(year).validate()).toBe(expected);
    });
  });
  it("runtime required number", () => {
    const runtimes: [any, boolean][] = [
      [undefined, false],
      [NaN, false],
      [{}, false],
      [Infinity, true],
      [-Infinity, true],
      [0, true],
      [2137, true],
      ["0", true],
      ["2137", true],
      ["123abc", false],
      ["foobar", false],
    ];
    runtimes.forEach(([year, expected]) => {
      expect(movie().year(year).validate()).toBe(expected);
    });
  })
  it('director required string <= 255 characters', () => {
    const directors: [any, boolean][] = [
      [undefined, false],
      [{}, false],
      [NaN, false],
      ["", true],
      ["Good Director", true],
      ["Bad".repeat(260 / 3), false],
      ["A".repeat(256), false],
      ["A".repeat(255), true],
    ];
    directors.forEach(([director, expected]) => {
      expect(movie().director(director).validate()).toBe(expected);
    });
  });
  it('actors optional string', () => {
    const actors: [any, boolean][] = [
      [undefined, true],
      [{}, false],
      [NaN, false],
      [null, false],
      ["good actor", true],
    ];
    actors.forEach(([actors, expected]) => {
      expect(movie().actors(actors).validate()).toBe(expected);
    });
  });
  it('plot optional string', () => {
    const plots: [any, boolean][] = [
      [undefined, true],
      [{}, false],
      [NaN, false],
      [null, false],
      ["good plot", true],
      ["", true],
    ];
    plots.forEach(([actors, expected]) => {
      expect(movie().actors(actors).validate()).toBe(expected);
    });
  });
  it('posterUrl optional string', () => {
    const posterUrls: [any, boolean][] = [
      [undefined, true],
      [{}, false],
      [NaN, false],
      [null, false],
      ["good posterUrl", true],
      ["", true],
    ];
    posterUrls.forEach(([actors, expected]) => {
      expect(movie().actors(actors).validate()).toBe(expected);
    });
  });
  it("error", () => {
    const data = movie().year("bad year").validate();
    expect(data).toBe(false);
  });
});

function movie() {
  return MovieBuilder.new();
}

class MovieBuilder {
  _genres: Set<Genre> = new Set();
  _title = '';
  _year = 1;
  _runtime = 1;
  _director = '';
  _actors?: string;
  _plot?: string;
  _posterUrl?: string;
  static new() {
    return new MovieBuilder();
  }
  #genre(genre: Genre) {
    this._genres.add(genre);
  }
  build(): Movie {
    const data = Object.entries(this).reduce((acc, [key, value]) => {
      if (value instanceof Set) {
        value = Array.from(value);
      }
      return { ...acc, [key.slice(1)]: value };
    }, {}) as Movie;
    data.genres.length || data.genres.push('War');
    return data;
  }
  validate() {
    const data = this.build();
    return movieSchema.safeParse(data).success;
  }
  genres(genres: any[]) {
    genres.map(genre => this.#genre(genre));
    return this;
  }
  genre(genre: any) {
    this._genres.add(genre);
    return this;
  }
  title(title: any) {
    this._title = title;
    return this;
  }
  year(year: any) {
    this._year = year;
    return this;
  }
  runtime(runtime: any) {
    this._runtime = runtime;
    return this;
  }
  director(director: any) {
    this._director = director;
    return this;
  }
  actors(actors: any) {
    this._actors = actors;
    return this;
  }
}
