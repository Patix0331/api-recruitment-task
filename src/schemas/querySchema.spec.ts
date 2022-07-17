import { Genre } from "./movieSchema";
import { Query, querySchema } from "./querySchema";

function query() {
  return QueryBuilder.new();
}

describe("query schema", () => {
  it("genres optional", () => {
    expect(query().genres(["a", "b"]).validate()).toBe(false);
    expect(query().genres(["Musical", "Sport"]).validate()).toBe(true);
    expect(query().genres(["Musical", "Sport", "Sport"]).build().genres).toHaveLength(2);
    expect(query().genres(["Musical", "Musical", "Sport", "Sport"]).build().genres).toHaveLength(2);
    expect(query().genres(['a', 'a', 'b', 'b', 'c']).build().genres).toHaveLength(3);
  });
  it("duration optional number", () => {
    const durations: [any, boolean][] = [
      ["123", true],
      ["2137", true],
      ["123asdf", false],
      [123, false]
    ];
    expect(query().validate()).toBe(true);
    durations.forEach(([dur, expected]) => {
      expect(query().duration(dur).validate()).toBe(expected);
    });
  })
})

class QueryBuilder {
  _genres: Set<Genre> | undefined;
  _duration: string | undefined;
  static new() {
    return new QueryBuilder();
  }
  #genre(genre: Genre) {
    if (!this._genres) {
      this._genres = new Set();
    }
    this._genres.add(genre);
  }
  build(): Query {
    const data = Object.entries(this).reduce((acc, [key, value]) => {
      if (value instanceof Set) {
        value = Array.from(value);
      }
      return { ...acc, [key.slice(1)]: value };
    }, {}) as Query;
    return data;
  }
  validate() {
    const data = this.build();
    return querySchema.safeParse(data).success;
  }
  genres(genres: any[]) {
    genres.map(genre => this.#genre(genre));
    return this;
  }
  genre(genre: any) {
    this.#genre(genre);
    return this;
  }
  duration(duration: any) {
    this._duration = duration;
    return this;
  }
}
