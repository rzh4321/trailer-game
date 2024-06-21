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

export type categoryType = {
  id: number;
  name: string;
  criticScore: number | null;
  audienceScore: number | null;
};

export type categoryWithImageAndUrlType = {
  id: number;
  name: string;
  criticScore: number | null;
  audienceScore: number | null;
  url: string;
  image: string;
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

export type linkCategoryType =
  | "all"
  | "action"
  | "adventure"
  | "highest-critic"
  | "lowest-critic"
  | "highest-audience"
  | "lowest-audience"
  | "g"
  | "controversial"
  | "pg";

export type ModalState = {
  isOpen: boolean;
  position: { top: number; left: number } | null;
};

export type appliedFiltersType = {
  sort: string | null;
  audScore: { rotten: boolean; fresh: boolean };
  tomatometer: { certified: boolean; rotten: boolean; fresh: boolean };
  certifiedFresh: boolean;
};

export type CategoryToTableName = {
  all: string;
  "highest-critic": string;
  "lowest-critic": string;
  "highest-audience": string;
  "lowest-audience": string;
  controversial: string;
  g: string;
  pg: string;
  "pg-13": string;
  r: string;
  "nc-17": string;
  action: string;
  adventure: string;
  animation: string;
  anime: string;
  biography: string;
  comedy: string;
  crime: string;
  documentary: string;
  drama: string;
};
