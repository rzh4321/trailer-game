"use server";
import { db } from "@/db";
import { categories, users } from "@/schema";
import { and, desc, eq, isNull } from "drizzle-orm";
import type { userPlayType, linkCategoryType } from "@/types";
import categoryToTableName from "@/categoryToTableName";

export default async function getTopScores(
  category: linkCategoryType,
  numTrailers: number,
) {
  let topScores;
  if (category === "all") {
    topScores = await db.query.users.findMany({
      columns: {
        username: true,
        criticScore: true,
        audienceScore: true,
        finalScore: true,
        time: true,
      },
      where: and(
        isNull(users.categoryId),
        eq(users.numTrailers as any, numTrailers as any),
      ),
      orderBy: [desc(users.finalScore)],
      limit: 5,
    });
  } else {
    // get the database category name and id
    const dbCategory = categoryToTableName[category];
    const { id: categoryId } = (await db.query.categories.findFirst({
      columns: {
        id: true,
      },
      where: eq(categories.name, dbCategory),
    })) as { id: number };
    // get top scores given categoryId and numTrailers
    topScores = await db.query.users.findMany({
      columns: {
        username: true,
        criticScore: true,
        audienceScore: true,
        finalScore: true,
        time: true,
      },
      where: and(
        eq(users.categoryId, categoryId),
        eq(users.numTrailers, numTrailers),
      ),
      orderBy: [desc(users.finalScore)],
      limit: 5,
    });
  }
  return topScores as userPlayType[];
}
