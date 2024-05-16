import { useState, useEffect } from "react";
import type { movieWithVideoIdAndImageType } from "@/types";
import getMovies from "@/actions/getMovies";
import type { linkCategoryType } from "@/types";

export default function useMovies(count: number, category: linkCategoryType) {
  const [movies, setMovies] = useState<movieWithVideoIdAndImageType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await getMovies(count, category);
      console.log("RES IS ", res);
      setMovies(res);
    };
    fetchMovies();
  }, [count, category]);

  useEffect(() => {
    if (movies?.length > 0) {
      setLoading(false);
    }
  }, [movies]);

  return { movies, loading };
}
