import type { guessType } from "@/types";
import UserInputs from "./UserInputs";

type GameProps = {
  onGuess: (guessesObj: guessType) => void;
  videoId: string;
  movieName: string;
  movieNum: number;
  totalMovieNum: number;
};

export default function Game({
  onGuess,
  videoId,
  movieName,
  movieNum,
  totalMovieNum,
}: GameProps) {
  return (
    <>
      <div>
        <h1 className="text-2xl tracking-widest font-bold">
          {movieNum}/{totalMovieNum}
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start max-w-6xl mx-auto lg:gap-20 gap-8">
        <div className="video-wrapper flex-grow pr-5 relative pt-[56.25%] w-full">
          {/* <h1>{obj.movieName} - critic: {obj.criticScore}, audience: {obj.audienceScore}</h1> */}
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={movieName}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
        <UserInputs
          onGuess={onGuess}
          isLastTrailer={movieNum === totalMovieNum}
        />
      </div>
    </>
  );
}
