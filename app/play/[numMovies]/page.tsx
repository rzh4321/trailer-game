"use client";
import useMovies from "@/hooks/useMovies";
import Game from "@/components/Game";
import { useState } from "react";
import type { guessType } from "@/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Play({ params }: { params: { numMovies: string } }) {
  const { movies, loading } = useMovies(+params.numMovies);
  const [guesses, setGuesses] = useState<guessType[]>([]);
  const [movieInd, setMovieInd] = useState(0);

  // const elems = movies?.map(movieObj => <Game key={movieObj.videoId} videoId={movieObj.videoId} movieName={movieObj.movieName} />)

  const onGuess = (guessesObj: guessType) => {
    const copy = [...guesses];
    copy.push(guessesObj);
    setGuesses(copy);
    setMovieInd((prev) => prev + 1);
  };

  if (loading) {
    return (
      <div className="text-3xl font-sans tracking-wide text-center">
        Loading Trailers
        <span className="dots overflow-hidden align-baseline"></span>
      </div>
    );
  }

  if (movieInd == movies?.length) {
    return (
      <div>
        {guesses.map((guessObj: guessType, ind: number) => {
          return (
            <div key={ind} className="flex flex-col gap-10">
              <div>
                <h1>{movies[ind].movieName}</h1>
                <div>
                  <span>Critic score: {movies[ind].criticScore}</span>
                  {` `}
                  <span>You guessed {guessObj.criticGuess}</span>
                </div>
                <div>
                  <span>Audience score: {movies[ind].audienceScore}</span>
                  {` `}
                  <span>You guessed {guessObj.audienceGuess}</span>
                </div>
              </div>
            </div>
          );
        })}
        <Button asChild>
          <Link href={"/"}>Back to Menu</Link>
        </Button>
        <br />
        <Button
          onClick={() => {
            location.reload();
          }}
        >
          Play Again
        </Button>
      </div>
    );
  }

  return (
    <>
      <Game
        onGuess={onGuess}
        videoId={movies![movieInd].videoId}
        movieName={movies![movieInd].movieName}
      />
    </>
  );
}
