import { z } from "zod";

// Need to define this manually until this merge https://github.com/microsoft/TypeScript/issues/32063
const genres = [
  "Comedy",
  "Fantasy",
  "Crime",
  "Drama",
  "Music",
  "Adventure",
  "History",
  "Thriller",
  "Animation",
  "Family",
  "Mystery",
  "Biography",
  "Action",
  "Film-Noir",
  "Romance",
  "Sci-Fi",
  "War",
  "Western",
  "Horror",
  "Musical",
  "Sport"
] as const;

export const genreSchema = z.enum(genres).array().min(1);
export const movieSchema = z.object({
  genres: genreSchema,
  title: z.string().max(255),
  year: z.string().or(z.number()).transform(x => +x),
  runtime: z.string().or(z.number()).transform(x => +x),
  director: z.string().max(255),
  actors: z.string().optional(),
  plot: z.string().optional(),
  posterUrl: z.string().optional(),
})
  .refine(movie => !isNaN(movie.year), { message: "year must be a number", path: ["year"] })
  .refine(movie => !isNaN(movie.runtime), { message: "runtime must be a number", path: ["runtime"] });

export type Genre = typeof genres[number];
export type Movie = z.infer<typeof movieSchema>;
