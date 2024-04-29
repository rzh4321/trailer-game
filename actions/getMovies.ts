"use server";
import * as cheerio from "cheerio";
import getYouTubeUrl from "./getYouTubeUrl";
import type { movieType, movieWithVideoIdAndImageType } from "../types";
import links from "@/links";
// import * as fs from 'fs';

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
    const res = await fetch(links[i]);
    const text = await res.text();
    const $ = cheerio.load(text);

    // fs.writeFile('output.html', $.html(), (err) => {
    //   if (err) {
    //     console.error('Error writing to file:', err);
    //   } else {
    //     console.log('Saved HTML to output.html');
    //   }
    // });

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

      // Extract the image src
      const src = $(`rt-img[alt="${movieName}"]`).attr("src");
      if (criticScore && audienceScore) {
        const obj = { movieName, audienceScore, criticScore, src };
        allMovies.push(obj);
      }
    });
  }
  console.log("length of all movies is ", allMovies.length);
  // remove any duplicate movies
  allMovies = Array.from(
    new Set(allMovies.map((obj) => JSON.stringify(obj))),
  ).map((str) => JSON.parse(str));
  console.log("length of movies after remove dups is ", allMovies.length);
  // select random movies
  let movies;
  let moviesWithIds: movieWithVideoIdAndImageType[] = [];
  while (true) {
    movies = getRandomObjects(allMovies, count);
    const videoIdsPromises = movies.map((movieObj: movieType) => 
      getYouTubeUrl(movieObj.movieName),    
    );
    const videoIds = (await Promise.all(videoIdsPromises));
    // make sure that each movie has their YouTube videoId
    const retrievedAllVideoIds = videoIds.every(id => id !== null);
    if (retrievedAllVideoIds) {
      moviesWithIds = movies.map(
        (obj: movieType, index: number) => {
          return Object.assign({}, obj, { videoId: videoIds[index]! });
        },
      );
      break;
    }
  }
  return moviesWithIds;
}
