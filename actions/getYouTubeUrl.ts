"use server";
import * as cheerio from "cheerio";

function convertToQueryParam(str: string) {
  // use encodeURIComponent to ensure all characters are properly escaped.
  const encoded = encodeURIComponent(str);
  // replace encoded spaces (%20) with +
  return encoded.replace(/%20/g, "+");
}

export default async function getYouTubeUrl(title: string) {
  const res = await fetch(
    `https://www.youtube.com/results?search_query=${convertToQueryParam(title)}+trailer`,
  );
  const text = await res.text();
  const $ = cheerio.load(text);

  const regexPattern =
    /"WEB_PAGE_TYPE_WATCH","rootVe":3832}},"watchEndpoint":\{"videoId":"([^"]+)"/g;
  const match = regexPattern.exec($.html());
  const videoId = match ? match[1] : null;
  return videoId;
}
