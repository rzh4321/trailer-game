import type { guessType, movieWithVideoIdAndImageType } from "@/types";
import { Button } from "./ui/button";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeftSquare, ArrowRightSquare } from "lucide-react";
import Image from "next/image";

type GameOverProps = {
  guesses: guessType[];
  movies: movieWithVideoIdAndImageType[];
};

export default function GameOver({ guesses, movies }: GameOverProps) {
  const [movieInd, setMovieInd] = useState(0);
  console.log(movies);
  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="text-2xl tracking-widest font-bold">
          {movieInd + 1}/{guesses.length}
        </h1>
        <div className="flex gap-1">
          <ArrowLeftSquare
            className="cursor-pointer"
            onClick={() => setMovieInd((prev) => Math.max(prev - 1, 0))}
          />
          <ArrowRightSquare
            className="cursor-pointer"
            onClick={() =>
              setMovieInd((prev) => Math.min(prev + 1, guesses.length - 1))
            }
          />
        </div>
      </div>
      <div className="flex flex-col items-center gap-5 mt-3">
        <h1 className="font-bold tracking-wide text-2xl">
          {movies[movieInd].movieName}
        </h1>
        <div>
          <Image
            width={206}
            height={305}
            alt="movie-poster"
            src={movies[movieInd].src ?? ""}
          />
        </div>
        <div className="flex gap-1 tracking-wider">
          <span className="flex gap-1">
            Critic score:
            <Image
              alt="critic"
              height={20}
              width={20}
              src={
                +movies[movieInd].criticScore >= 90
                  ? "https://www.rottentomatoes.com/assets/pizza-pie/images/icons/tomatometer/certified_fresh-notext.56a89734a59.svg"
                  : +movies[movieInd].criticScore >= 60
                    ? "https://www.rottentomatoes.com/assets/pizza-pie/images/icons/tomatometer/tomatometer-fresh.149b5e8adc3.svg"
                    : "https://www.rottentomatoes.com/assets/pizza-pie/images/icons/tomatometer/tomatometer-rotten.f1ef4f02ce3.svg"
              }
            />
            <span
              className={
                +movies[movieInd].criticScore >= 90
                  ? "text-green-600"
                  : +movies[movieInd].criticScore >= 60
                    ? "text-yellow-300"
                    : "text-red-600"
              }
            >
              {movies[movieInd].criticScore}%.
            </span>
          </span>
          {` `}
          <span className="flex gap-1">
            You guessed{" "}
            <Image
              alt="critic"
              height={20}
              width={20}
              src={
                +guesses[movieInd].criticGuess >= 90
                  ? "https://www.rottentomatoes.com/assets/pizza-pie/images/icons/tomatometer/certified_fresh-notext.56a89734a59.svg"
                  : +guesses[movieInd].criticGuess >= 60
                    ? "https://www.rottentomatoes.com/assets/pizza-pie/images/icons/tomatometer/tomatometer-fresh.149b5e8adc3.svg"
                    : "https://www.rottentomatoes.com/assets/pizza-pie/images/icons/tomatometer/tomatometer-rotten.f1ef4f02ce3.svg"
              }
            />
            <span
              className={
                +guesses[movieInd].criticGuess >= 90
                  ? "text-green-600"
                  : +guesses[movieInd].criticGuess >= 60
                    ? "text-yellow-300"
                    : "text-red-600"
              }
            >
              {guesses[movieInd].criticGuess}%.
            </span>
          </span>
        </div>
        <div className="flex gap-1 tracking-wider">
          <span className="flex gap-1">
            Audience score:
            <Image
              alt="audience"
              height={20}
              width={20}
              src={
                +movies[movieInd].audienceScore >= 60
                  ? "https://www.rottentomatoes.com/assets/pizza-pie/images/icons/audience/aud_score-fresh.6c24d79faaf.svg"
                  : "https://www.rottentomatoes.com/assets/pizza-pie/images/icons/audience/aud_score-rotten.f419e4046b7.svg"
              }
            />
            <span
              className={
                +movies[movieInd].audienceScore >= 90
                  ? "text-green-600"
                  : +movies[movieInd].audienceScore >= 60
                    ? "text-yellow-300"
                    : "text-red-600"
              }
            >
              {movies[movieInd].audienceScore}%.
            </span>
          </span>
          {` `}
          <span className="flex gap-1">
            You guessed{" "}
            <Image
              alt="critic"
              height={20}
              width={20}
              src={
                +guesses[movieInd].audienceGuess >= 60
                  ? "https://www.rottentomatoes.com/assets/pizza-pie/images/icons/audience/aud_score-fresh.6c24d79faaf.svg"
                  : "https://www.rottentomatoes.com/assets/pizza-pie/images/icons/audience/aud_score-rotten.f419e4046b7.svg"
              }
            />
            <span
              className={
                +guesses[movieInd].criticGuess >= 90
                  ? "text-green-600"
                  : +guesses[movieInd].criticGuess >= 60
                    ? "text-yellow-300"
                    : "text-red-600"
              }
            >
              {guesses[movieInd].audienceGuess}%.
            </span>
          </span>
        </div>

        <div className="flex gap-5">
          <Button asChild>
            <Link href={"/"}>Back to Menu</Link>
          </Button>
          <Button
            onClick={() => {
              location.reload();
            }}
          >
            Play Again
          </Button>
        </div>
      </div>
    </>
  );
}
