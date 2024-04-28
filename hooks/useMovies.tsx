import { useState, useEffect } from "react";
import type { movieWithVideoIdType } from "@/types";
import getMovies from "@/actions/getMovies";

export default function useMovies(count: number) {
  const [movies, setMovies] = useState<movieWithVideoIdType[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await getMovies(count);
      setMovies(res);
      setLoading(false);
    };
    fetchMovies();
  }, [count]);

  return { movies, loading };
}
