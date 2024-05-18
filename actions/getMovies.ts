"use server";
import getYouTubeUrl from "./getYouTubeUrl";
import type { movieWithVideoIdAndImageType, dbResType } from "../types";
import { db } from "@/db";
import { sql, eq } from "drizzle-orm";
import { movies } from "@/schema";
import type { linkCategoryType } from "../types";
import { categories } from "@/schema";
import categoryToTableName from "@/categoryToTableName";

export default async function getMovies(
  count: number,
  category: linkCategoryType,
) {
  let dbRes: any[] = [];
  const dbCategory = categoryToTableName[category];
  console.log("dbcategory is ", dbCategory);
  if (dbCategory === "All") {
    console.log("ur in /all");
    dbRes = await db.execute(
      sql`SELECT * FROM movies ORDER BY RANDOM() LIMIT ${count}`,
    );
  } else {
    console.log("ur not in /all");
    // get category id
    const { id: categoryId } = (await db.query.categories.findFirst({
      columns: {
        id: true,
      },
      where: eq(categories.name, dbCategory),
    })) as { id: number };
    console.log("categoryid is ", categoryId);
    dbRes = await db.execute(
      sql`SELECT * FROM movies JOIN movie_category ON movies.id = movie_category.movie_id WHERE movie_category.category_id = ${categoryId} ORDER BY RANDOM() LIMIT ${count}`,
    );
  }
  const randomMovies = Array.from(dbRes) as dbResType[];
  console.log("after limiting, random movies is ", randomMovies);

  const moviesWithIdsPromises = randomMovies.map(
    async (obj: dbResType, index: number) => {
      // already know the videoId
      if (obj.video_id) {
        return Object.assign({}, obj, { video_id: obj.video_id });
      }
      // figure out the videoId of this movie trailer
      const videoId = await getYouTubeUrl(obj.movie_name);
      // update videoId in database table
      await db
        .update(movies)
        .set({ videoId: videoId })
        .where(eq(movies.movieName, obj.movie_name));
      return Object.assign({}, obj, { video_id: videoId });
    },
  );
  const moviesWithIds: movieWithVideoIdAndImageType[] = await Promise.all(
    moviesWithIdsPromises,
  );
  console.log(moviesWithIds);
  return moviesWithIds;
}
