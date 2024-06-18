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

export type linkCategoryType = "all" | "action" | "adventure" | "highest-critic" | "lowest-critic" | "highest-audience" | "lowest-audience" | "g" | "controversial";

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
