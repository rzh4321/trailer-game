"use client";
import useMovies from "@/hooks/useMovies";
import Game from "@/components/Game";
import { useState } from "react";
import type { guessType } from "@/types";
import { useRouter } from "next/navigation";
import GameOver from "@/components/GameOver";
import type { linkCategoryType } from "@/types";
import Background from "@/components/Background";
import "@/app/background.scss";

export default function Play({
  params,
}: {
  params: { numMovies: string; category: linkCategoryType };
}) {
  const { movies, loading } = useMovies(+params.numMovies, params.category);
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
        <Background />
      </div>
    );
  }

  if (movieInd == movies.length) {
    return (
      <GameOver
        guesses={guesses}
        movies={movies}
        username={username}
        category={params.category}
      />
    );
  }

  return (
    <>
      <Background />
      <Game
        onGuess={onGuess}
        videoId={movies[movieInd].video_id}
        movieName={movies[movieInd].movie_name}
        movieNum={movieInd + 1}
        totalMovieNum={+params.numMovies}
        username={username}
        setUsername={setUsername}
      />
    </>
  );
}
