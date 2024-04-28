export type movieType = {
  movieName: string;
  criticScore: string;
  audienceScore: string;
  src: string | undefined;
};

export type movieWithVideoIdAndImageType = {
  movieName: string;
  criticScore: string;
  audienceScore: string;
  videoId: string;
  src: string | undefined;
};

export type guessType = {
  criticGuess: string;
  audienceGuess: string;
};
