export type movieType = {
  movieName: string;
  criticScore: string;
  audienceScore: string;
};

export type movieWithVideoIdType = {
  movieName: string;
  criticScore: string;
  audienceScore: string;
  videoId: string;
};

export type guessType = {
  criticGuess: string;
  audienceGuess: string;
};
