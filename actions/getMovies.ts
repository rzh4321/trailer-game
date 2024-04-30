"use server";
import getYouTubeUrl from "./getYouTubeUrl";
import type { movieWithVideoIdAndImageType, dbResType } from "../types";
import { db } from "@/db";
import { sql, eq } from "drizzle-orm";
import { movies } from "@/schema";

export default async function getMovies(count: number) {
  const dbRes = await db.execute(
    sql`select * from movies order by RANDOM() limit ${count}`,
  );
  const randomMovies = Array.from(dbRes) as dbResType[];

  const moviesWithIdsPromises = randomMovies.map(
    async (obj: dbResType, index: number) => {
      if (obj.videoId) {
        return Object.assign({}, obj, { videoId: obj.videoId });
      }
      const videoId = await getYouTubeUrl(obj.movieName);
      // update videoId in database table
      await db
        .update(movies)
        .set({ videoId: videoId })
        .where(eq(movies.movieName, obj.movieName));
      return Object.assign({}, obj, { videoId: videoId });
    },
  );
  const moviesWithIds: movieWithVideoIdAndImageType[] = await Promise.all(
    moviesWithIdsPromises,
  );
  console.log(moviesWithIds);
  return moviesWithIds;
}
