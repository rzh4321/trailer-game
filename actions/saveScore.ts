"use server";
import { db } from "@/db";
import { categories, users } from "@/schema";
import { eq } from "drizzle-orm";

export default async function saveScore(
  audienceScore: number,
  criticScore: number,
  finalScore: number,
  category: string,
  numTrailers: number,
  username: string,
) {
  // const users = await db.select().from(movies).innerJoin(movieCategory, eq(movies.id, movieCategory.movieId)).innerJoin(categories, eq(movieCategory.categoryId, categories.id)).where(eq(movies.movieName, 'Mad Max: Fury Road'));
  console.log("saving scores....");
  let categoryId;
  if (category === "all") {
    categoryId = null;
  }
  // find categoryId if category is not 'all'
  else {
    const { id } = (await db.query.categories.findFirst({
      columns: {
        id: true,
      },
      where: eq(categories.name, category),
    })) as { id: number };
    categoryId = id;
  }
  console.log("category id is ", categoryId);
  return await db
    .insert(users)
    .values({
      audienceScore: audienceScore,
      criticScore: criticScore,
      finalScore: finalScore,
      categoryId: categoryId,
      numTrailers: numTrailers,
      username: username,
    });
}
