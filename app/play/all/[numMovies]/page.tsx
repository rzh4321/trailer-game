"use client";
import useMovies from "@/hooks/useMovies";
import Game from "@/components/Game";
import { useState } from "react";
import type { guessType } from "@/types";
import { useRouter } from "next/navigation";
import GameOver from "@/components/GameOver";

export default function Play({ params }: { params: { numMovies: string } }) {
  const { movies, loading } = useMovies(+params.numMovies);
  const [guesses, setGuesses] = useState<guessType[]>([]);
  const [movieInd, setMovieInd] = useState(0);
  const [username, setUsername] = useState("");

  const router = useRouter();

  if (+params.numMovies > 10) {
    router.back();
  }

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

  if (movieInd == movies.length) {
    return <GameOver guesses={guesses} movies={movies} username={username} />;
  }

  return (
    <>
      <Game
        onGuess={onGuess}
        videoId={movies[movieInd].videoId}
        movieName={movies[movieInd].movieName}
        movieNum={movieInd + 1}
        totalMovieNum={+params.numMovies}
        username={username}
        setUsername={setUsername}
      />
    </>
  );
}
