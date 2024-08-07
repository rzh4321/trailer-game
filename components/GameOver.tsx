import type {
  guessType,
  movieWithVideoIdAndImageType,
  linkCategoryType,
} from "@/types";
import { Button } from "./ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowLeftSquare, ArrowRightSquare } from "lucide-react";
import Image from "next/image";
import { Loader } from "lucide-react";
import saveScore from "@/actions/saveScore";
import { usePathname } from "next/navigation";

type GameOverProps = {
  guesses: guessType[];
  movies: movieWithVideoIdAndImageType[];
  username: string;
  category: linkCategoryType;
};

async function calculateScores(
  movies: movieWithVideoIdAndImageType[],
  guesses: guessType[],
  username: string,
  category: linkCategoryType,
) {
  let totalCriticDifference = 0;
  let totalAudienceDifference = 0;

  movies.forEach((movie, index) => {
    const movieCriticScore = parseInt(movie.critic_score, 10);
    const movieAudienceScore = parseInt(movie.audience_score, 10);
    const guessCriticScore = parseInt(guesses[index].criticGuess, 10);
    const guessAudienceScore = parseInt(guesses[index].audienceGuess, 10);

    totalCriticDifference += Math.abs(movieCriticScore - guessCriticScore);
    totalAudienceDifference += Math.abs(
      movieAudienceScore - guessAudienceScore,
    );
  });
  console.log(
    "totalcriticdifference is ",
    totalCriticDifference,
    " totalaudiencedifference is ",
    totalAudienceDifference,
  );

  const avgCriticDifference = totalCriticDifference / movies.length;
  const avgAudienceDifference = totalAudienceDifference / movies.length;
  console.log(
    "avfcriticdiff is ",
    avgCriticDifference,
    " avfaudiencediff is ",
    avgAudienceDifference,
  );

  const criticScore = Math.round(100 - avgCriticDifference * 1.5);
  const audienceScore = Math.round(100 - avgAudienceDifference * 1.5);
  console.log("avgcriticdiff is *1.5 = ", avgCriticDifference * 1.5);
  console.log("avgaudiencediff is *1.5 = ", avgAudienceDifference * 1.5);

  // scores cant go below 0
  const adjustedCriticScore = Math.max(criticScore, 0);
  const adjustedAudienceScore = Math.max(audienceScore, 0);

  // final score is average of the critic and audience scores
  const finalScore = Math.round(
    (adjustedCriticScore + adjustedAudienceScore) / 2,
  );

  // Generate a phrase based on the scores
  const phrase = generatePhrase(adjustedCriticScore, adjustedAudienceScore);

  // If a username is provided, save the score to the leaderboard
  if (username !== "") {
    const res = await saveScore(
      adjustedAudienceScore,
      adjustedCriticScore,
      finalScore,
      category,
      movies.length,
      username,
    );
    console.log(res);
  }

  // Return the calculated scores and generated phrase
  return {
    criticScore: adjustedCriticScore,
    audienceScore: adjustedAudienceScore,
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

export default function GameOver({
  guesses,
  movies,
  username,
  category,
}: GameOverProps) {
  const [movieInd, setMovieInd] = useState(0);
  const [audienceScore, setAudienceScore] = useState<number | undefined>();
  const [criticScore, setCriticScore] = useState<number | undefined>();
  const [finalScore, setFinalScore] = useState<number | undefined>();
  const [phrase, setPhrase] = useState<string | undefined>();
  const pathname = usePathname();
  const menuPath = pathname.slice(0, -2);

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // console.log('audiencescore: ', audienceScore, ' critic score: ', criticScore, ' finalscore: ', finalScore)
  if (
    audienceScore === undefined ||
    criticScore === undefined ||
    finalScore === undefined
  )
    return <Loader className="animate-spin" />;
  return (
    <>
      <div className="flex flex-col items-center gap-2">
        <div>
          <span className="tracking-widest font-poppins text-center font-semibold">
            {phrase}
          </span>
          <Image
            alt="reaction"
            height={20}
            width={20}
            className="inline ml-1"
            src={
              finalScore >= 80
                ? "https://www.svgrepo.com/show/271847/shocked-emoji.svg"
                : finalScore >= 50
                  ? "https://www.svgrepo.com/show/492558/deadpan-1.svg"
                  : "https://www.svgrepo.com/show/492553/laugh-and-cry.svg"
            }
          />
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-1">
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
              className={`font-semibold ${
                criticScore >= 90
                  ? "text-green-500"
                  : criticScore >= 80
                    ? "text-yellow-600/90"
                    : "text-red-700"
              }`}
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
              className={`font-semibold ${
                audienceScore >= 90
                  ? "text-green-500"
                  : audienceScore >= 80
                    ? "text-yellow-600/90"
                    : "text-red-700"
              }`}
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
            className={`font-semibold ${
              finalScore >= 90
                ? "text-green-500"
                : finalScore >= 80
                  ? "text-yellow-600/90"
                  : "text-red-700"
            }`}
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
        <h1 className="font-bold tracking-wide text-2xl text-center">
          {movies[movieInd].movie_name}
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
                +movies[movieInd].critic_score >= 90
                  ? "https://www.rottentomatoes.com/assets/pizza-pie/images/icons/tomatometer/certified_fresh-notext.56a89734a59.svg"
                  : +movies[movieInd].critic_score >= 60
                    ? "https://www.rottentomatoes.com/assets/pizza-pie/images/icons/tomatometer/tomatometer-fresh.149b5e8adc3.svg"
                    : "https://www.rottentomatoes.com/assets/pizza-pie/images/icons/tomatometer/tomatometer-rotten.f1ef4f02ce3.svg"
              }
            />
            <span
              className={`font-semibold ${
                +movies[movieInd].critic_score >= 90
                  ? "text-green-500"
                  : +movies[movieInd].critic_score >= 80
                    ? "text-yellow-600/90"
                    : "text-red-700"
              }`}
            >
              {movies[movieInd].critic_score}%.
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
              className={`font-semibold ${
                +guesses[movieInd].criticGuess >= 90
                  ? "text-green-500"
                  : +guesses[movieInd].criticGuess >= 80
                    ? "text-yellow-600/90"
                    : "text-red-700"
              }`}
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
                +movies[movieInd].audience_score >= 60
                  ? "https://www.rottentomatoes.com/assets/pizza-pie/images/icons/audience/aud_score-fresh.6c24d79faaf.svg"
                  : "https://www.rottentomatoes.com/assets/pizza-pie/images/icons/audience/aud_score-rotten.f419e4046b7.svg"
              }
            />
            <span
              className={`font-semibold ${
                +movies[movieInd].audience_score >= 90
                  ? "text-green-500"
                  : +movies[movieInd].audience_score >= 60
                    ? "text-yellow-600/90"
                    : "text-red-700"
              }`}
            >
              {movies[movieInd].audience_score}%.
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
              className={`font-semibold ${
                +guesses[movieInd].criticGuess >= 90
                  ? "text-green-500"
                  : +guesses[movieInd].criticGuess >= 60
                    ? "text-yellow-600/90"
                    : "text-red-700"
              }`}
            >
              {guesses[movieInd].audienceGuess}%.
            </span>
          </span>
        </div>

        <div className="flex gap-5">
          <Button className="hover:bg-tomatoes/80 bg-tomatoes" asChild>
            <Link href={menuPath}>Back to Menu</Link>
          </Button>
          <Button
            variant={"spotify"}
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
