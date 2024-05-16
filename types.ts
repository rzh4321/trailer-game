export type movieWithVideoIdAndImageType = {
  id: number;
  movie_name: string;
  critic_score: string;
  audience_score: string;
  video_id: string;
  src: string | undefined;
};

export type dbResType = {
  id: number;
  movie_name: string;
  critic_score: string;
  audience_score: string;
  video_id: string | null;
  src: string | undefined;
};

export type guessType = {
  criticGuess: string;
  audienceGuess: string;
};

export type userPlayType = {
  username: string;
  criticScore: number;
  audienceScore: number;
  finalScore: number;
  time: Date;
};

export type linkCategoryType = "all" | "action" | "adventure";
