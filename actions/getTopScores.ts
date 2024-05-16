"use server";
import { db } from "@/db";
import { categories, users } from "@/schema";
import { ColumnBaseConfig, and, desc, eq, isNull } from "drizzle-orm";
import { userPlayType } from "@/types";

export default async function getTopScores(
  category: string,
  numTrailers: number,
) {
  console.log("numtrailers is ", numTrailers);
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
  }
  return topScores as userPlayType[];
}
