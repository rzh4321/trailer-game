"use server";
import getYouTubeUrl from "./getYouTubeUrl";
import type { categoryType, linkCategoryType } from "../types";
import { db } from "@/db";
import { sql, eq } from "drizzle-orm";
import { movies } from "@/schema";


export default async function getCategories() {
  let dbRes : any[] = [];
  dbRes = await db.query.categories.findMany();
  let res = Array.from(dbRes) as categoryType[];
  // console.log(res);
  return res;
}
