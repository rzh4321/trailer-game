import {
  pgTable,
  primaryKey,
  serial,
  integer,
  varchar,
} from "drizzle-orm/pg-core";

export const movies = pgTable("movies", {
  id: serial("id").primaryKey(),
  movieName: varchar("movieName"),
  criticScore: integer("criticScore"),
  audienceScore: integer("audienceScore"),
  videoId: varchar("videoId"),
  src: varchar("src"),
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name"),
});

export const movieCategory = pgTable(
  "movie_category",
  {
    movieId: integer("movie_id"),
    categoryId: integer("category_id"),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.movieId, table.categoryId] }),
    };
  },
);
