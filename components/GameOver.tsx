import type { guessType, movieWithVideoIdAndImageType } from "@/types";
import { Button } from "./ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  ArrowLeftSquare,
  ArrowRightSquare,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import Image from "next/image";
import { Loader } from "lucide-react";
import { usePathname } from "next/navigation";
import saveScore from "@/actions/saveScore";

type GameOverProps = {
  guesses: guessType[];
  movies: movieWithVideoIdAndImageType[];
  username: string;
};

async function calculateScores(
  movies: movieWithVideoIdAndImageType[],
  guesses: guessType[],
  username: string,
  category: string,
) {
  let totalCriticDifference = 0;
  let totalAudienceDifference = 0;

  movies.forEach((movie, index) => {
    const movieCriticScore = parseInt(movie.criticScore, 10);
    const movieAudienceScore = parseInt(movie.audienceScore, 10);
    const guessCriticScore = parseInt(guesses[index].criticGuess, 10);
    const guessAudienceScore = parseInt(guesses[index].audienceGuess, 10);

    totalCriticDifference += Math.abs(movieCriticScore - guessCriticScore);
    totalAudienceDifference += Math.abs(
      movieAudienceScore - guessAudienceScore,
    );
  });

  const criticScore = Math.round(100 - totalCriticDifference / movies.length);
  const audienceScore = Math.round(
    100 - totalAudienceDifference / movies.length,
  );
  const finalScore = Math.round((criticScore + audienceScore) / 2);

  const phrase = generatePhrase(criticScore, audienceScore);
  if (username !== "") {
    const res = await saveScore(
      audienceScore,
      criticScore,
      finalScore,
      category,
      movies.length,
      username,
    );
    console.log(res);
  }

  return {
    criticScore,
    audienceScore,
    finalScore,
    phrase,
  };
}

function generatePhrase(criticScore: number, audienceScore: number): string {
  if (criticScore > 80 && audienceScore > 80) {
    return "You're a true cinephile.";
  } else if (criticScore > 80) {
    return "Critic's favorite, aren't you?";
  } else if (audienceScore > 80) {
    return "Audiences love you, but critics... not so much.";
  } else if (criticScore < 50 && audienceScore < 50) {
    return "You are movie illiterate.";
  } else {
    return "You are a movie casual.";
  }
}

export default function GameOver({ guesses, movies, username }: GameOverProps) {
  const [movieInd, setMovieInd] = useState(0);
  const [audienceScore, setAudienceScore] = useState<number | undefined>();
  const [criticScore, setCriticScore] = useState<number | undefined>();
  const [finalScore, setFinalScore] = useState<number | undefined>();
  const [phrase, setPhrase] = useState<string | undefined>();
  const path = usePathname();
  const category = path.split("/")[2];

  useEffect(() => {
    const getScores = async () => {
      const { audienceScore, criticScore, finalScore, phrase } =
        await calculateScores(movies, guesses, username.trim(), category);
      setAudienceScore(audienceScore);
      setCriticScore(criticScore);
      setFinalScore(finalScore);
      setPhrase(phrase);
    };
    getScores();
  }, [
    audienceScore,
    criticScore,
    finalScore,
    phrase,
    guesses,
    movies,
    username,
    category,
  ]);
  if (!audienceScore || !criticScore || !finalScore)
    return <Loader className="animate-spin" />;
  return (
    <>
      <div className="flex flex-col items-center gap-2">
        <div className="flex gap-1">
          <span className="tracking-widest font-poppins">{phrase}</span>
          <Image
            alt="reaction"
            height={20}
            width={20}
            src={
              finalScore >= 80
                ? "https://www.svgrepo.com/show/271847/shocked-emoji.svg"
                : finalScore >= 50
                  ? "https://www.svgrepo.com/show/492558/deadpan-1.svg"
                  : "https://www.svgrepo.com/show/492553/laugh-and-cry.svg"
            }
          />
        </div>
        <div className="flex gap-1">
          <span className="flex tracking-wide gap-1">
            Your critic score:
            <Image
              alt="critic"
              height={20}
              width={20}
              src={
                criticScore >= 90
                  ? "https://www.rottentomatoes.com/assets/pizza-pie/images/icons/tomatometer/certified_fresh-notext.56a89734a59.svg"
                  : criticScore >= 60
                    ? "https://www.rottentomatoes.com/assets/pizza-pie/images/icons/tomatometer/tomatometer-fresh.149b5e8adc3.svg"
                    : "https://www.rottentomatoes.com/assets/pizza-pie/images/icons/tomatometer/tomatometer-rotten.f1ef4f02ce3.svg"
              }
            />
            <span
              className={
                criticScore >= 90
                  ? "text-green-600"
                  : criticScore >= 60
                    ? "text-yellow-300"
                    : "text-red-600"
              }
            >
              {criticScore}%.
            </span>
          </span>
          <span className="flex gap-1 tracking-wide">
            Your audience score:
            <Image
              alt="audience"
              height={20}
              width={20}
              src={
                audienceScore >= 60
                  ? "https://www.rottentomatoes.com/assets/pizza-pie/images/icons/audience/aud_score-fresh.6c24d79faaf.svg"
                  : "https://www.rottentomatoes.com/assets/pizza-pie/images/icons/audience/aud_score-rotten.f419e4046b7.svg"
              }
            />
            <span
              className={
                audienceScore >= 90
                  ? "text-green-600"
                  : audienceScore >= 60
                    ? "text-yellow-300"
                    : "text-red-600"
              }
            >
              {audienceScore}%.
            </span>
          </span>
        </div>
        <span className="flex gap-1 tracking-wide">
          Your final score:
          <Image
            alt="final"
            height={20}
            width={20}
            src={
              finalScore >= 60
                ? "https://www.svgrepo.com/show/396026/clapping-hands-light-skin-tone.svg"
                : "https://www.svgrepo.com/show/396044/clown-face.svg"
            }
          />
          <span
            className={
              finalScore >= 90
                ? "text-green-600"
                : finalScore >= 60
                  ? "text-yellow-300"
                  : "text-red-600"
            }
          >
            {finalScore}%.
          </span>
        </span>
      </div>
      <div className="flex flex-col items-center mt-3">
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
