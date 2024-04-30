export type movieWithVideoIdAndImageType = {
  id: number;
  movieName: string;
  criticScore: string;
  audienceScore: string;
  videoId: string;
  src: string | undefined;
};

export type dbResType = {
  id: number;
  movieName: string;
  criticScore: string;
  audienceScore: string;
  videoId: string | null;
  src: string | undefined;
};

export type guessType = {
  criticGuess: string;
  audienceGuess: string;
};
