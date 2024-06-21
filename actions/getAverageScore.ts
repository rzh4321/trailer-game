"use server";
import { db } from "@/db";
import { sql, eq, avg } from "drizzle-orm";
import { categories } from "@/schema";
import categoryToTableName from "@/categoryToTableName";
import type { CategoryToTableName } from "@/types";

export default async function getAverageScore(
  category: keyof CategoryToTableName,
) {
  const tableName = categoryToTableName[category];
  let res;
  if (category === "all") {
    // need to take the average of all categories
    res = await db
      .select({
        avgCritic: avg(categories.criticScore),
        avgAudience: avg(categories.audienceScore),
      })
      .from(categories);
  } else {
    // the avg scores are already stored in the db
    res = await db
      .select({
        avgAudience: categories.audienceScore,
        avgCritic: categories.criticScore,
      })
      .from(categories)
      .where(eq(categories.name, tableName));
  }

  const { avgCritic, avgAudience } = res[0] as {
    avgCritic: number;
    avgAudience: number;
  };
  return {
    avgAudience: Math.round(avgAudience),
    avgCritic: Math.round(avgCritic),
  };
}
