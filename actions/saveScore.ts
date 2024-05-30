"use server";
import { db } from "@/db";
import { categories, users } from "@/schema";
import { eq } from "drizzle-orm";
import type { linkCategoryType } from "@/types";
import categoryToTableName from "@/categoryToTableName";

export default async function saveScore(
  audienceScore: number,
  criticScore: number,
  finalScore: number,
  category: linkCategoryType,
  numTrailers: number,
  username: string,
) {
  const tableCategory = categoryToTableName[category];
  // const users = await db.select().from(movies).innerJoin(movieCategory, eq(movies.id, movieCategory.movieId)).innerJoin(categories, eq(movieCategory.categoryId, categories.id)).where(eq(movies.movieName, 'Mad Max: Fury Road'));
  console.log("saving scores....");
  let categoryId;
  if (tableCategory === "All") {
    categoryId = null;
  }
  // find categoryId if category is not 'All'
  else {
    const { id } = (await db.query.categories.findFirst({
      columns: {
        id: true,
      },
      where: eq(categories.name, tableCategory),
    })) as { id: number };
    categoryId = id;
  }
  return await db.insert(users).values({
    audienceScore: audienceScore,
    criticScore: criticScore,
    finalScore: finalScore,
    categoryId: categoryId,
    numTrailers: numTrailers,
    username: username,
  });
}
