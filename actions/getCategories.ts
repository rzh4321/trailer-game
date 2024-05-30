"use server";
import getYouTubeUrl from "./getYouTubeUrl";
import type { categoryType, linkCategoryType } from "../types";
import { db } from "@/db";
import { sql, eq, avg } from "drizzle-orm";
import { categories } from "@/schema";


export default async function getCategoriesAndAverages() {
  let dbRes : any[] = [];
  dbRes = await db.query.categories.findMany();
  let dbCategories = Array.from(dbRes) as categoryType[];
  const arr = await db.select({ avgCritic: avg(categories.criticScore), avgAudience: avg(categories.audienceScore)}).from(categories);
  const {avgCritic, avgAudience} = arr[0] as {avgCritic: string; avgAudience: string};
  return {dbCategories, avgCritic : Math.round(+avgCritic), avgAudience : Math.round(+avgAudience)};
}
