import { useState, useEffect } from "react";
import type { movieWithVideoIdAndImageType } from "@/types";
import getMovies from "@/actions/getMovies";

export default function useMovies(count: number) {
  const [movies, setMovies] = useState<movieWithVideoIdAndImageType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await getMovies(count);
      setMovies(res);
    };
    fetchMovies();
  }, [count]);

  useEffect(() => {
    if (movies?.length > 0) {
      setLoading(false);
    }
  }, [movies]);

  return { movies, loading };
}
