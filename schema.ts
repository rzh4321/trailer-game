import {
  pgTable,
  primaryKey,
  serial,
  integer,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const movies = pgTable("movies", {
  id: serial("id").primaryKey(),
  movieName: varchar("movie_name"),
  criticScore: integer("critic_score"),
  audienceScore: integer("audience_score"),
  videoId: varchar("video_id"),
  src: varchar("src"),
});

export const moviesRelations = relations(movies, ({ many }) => ({
  movieCategory: many(movieCategory),
}));

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name"),
  criticScore: integer("critic_score"),
  audienceScore: integer("audience_score"),
});

export const categoriesRelations = relations(categories, ({ many, one }) => ({
  movieCategory: many(movieCategory),
  users: many(users),
}));

export const movieCategory = pgTable(
  "movie_category",
  {
    movieId: integer("movie_id")
      .notNull()
      .references(() => movies.id),
    categoryId: integer("category_id")
      .notNull()
      .references(() => categories.id),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.movieId, table.categoryId] }),
    };
  },
);

export const usersToGroupsRelations = relations(movieCategory, ({ one }) => ({
  movie: one(movies, {
    fields: [movieCategory.movieId],
    references: [movies.id],
  }),
  category: one(categories, {
    fields: [movieCategory.categoryId],
    references: [categories.id],
  }),
}));

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  categoryId: integer("category_id"),
  username: varchar("username"),
  criticScore: integer("critic_score"),
  audienceScore: integer("audience_score"),
  finalScore: integer("final_score"),
  numTrailers: integer("num_trailers"),
  time: timestamp("time").defaultNow(),
});

export const usersRelations = relations(users, ({ one }) => ({
  category: one(categories, {
    fields: [users.categoryId],
    references: [categories.id],
  }),
}));
