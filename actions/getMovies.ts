"use server";
import * as cheerio from "cheerio";
import getYouTubeUrl from "./getYouTubeUrl";
import type { movieType, movieWithVideoIdType } from "../types";
import links from "@/links";

function getRandomObjects(array: movieType[], count: number) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array.slice(0, count);
}

export default async function getMovies(count: number) {
  let allMovies: movieType[] = [];
  for (let i = 0; i < links.length; ++i) {
    const res = await fetch(
      links[i],
    );
    const text = await res.text();
    const $ = cheerio.load(text);
    $('a[data-qa="discovery-media-list-item-caption"]').each(function () {
      // Extract the movie name
      const movieName = $(this)
        .find('span[data-qa="discovery-media-list-item-title"]')
        .text()
        .trim();

      // Extract the audience score
      const audienceScore = $(this)
        .find("score-pairs-deprecated")
        .attr("audiencescore");

      // Extract the critic score
      const criticScore = $(this)
        .find("score-pairs-deprecated")
        .attr("criticsscore");
      if (criticScore && audienceScore) {
        const obj = { movieName, audienceScore, criticScore };
        allMovies.push(obj);
      }
    });
  }
  console.log('length of all movies is ', allMovies.length)
  allMovies = Array.from(
    new Set(allMovies.map((obj) => JSON.stringify(obj))),
  ).map((str) => JSON.parse(str));
  console.log('length of movies after remove dups is ', allMovies.length)

  const movies = getRandomObjects(allMovies, count);
  const videoIdsPromises = movies.map((movieObj: movieType) =>
    getYouTubeUrl(movieObj.movieName),
  );
  const videoIds = (await Promise.all(videoIdsPromises)) as string[];
  const moviesWithIds: movieWithVideoIdType[] = movies.map(
    (obj: movieType, index: number) => {
      return Object.assign({}, obj, { videoId: videoIds[index] });
    },
  );
  return moviesWithIds;
}
