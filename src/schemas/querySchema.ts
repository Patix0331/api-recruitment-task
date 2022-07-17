import { z } from "zod";
import { genreSchema } from "./movieSchema";

export const querySchema = z.object({
  duration: z.string().optional(),
  genres: genreSchema.optional(),
})
  .refine(({ duration }) => {
    if (duration) {
      return +duration === parseInt(duration);
    }
    return true;
  }, { message: "duration must be a number", path: ["duration"] });

export type Query = z.infer<typeof querySchema>;
