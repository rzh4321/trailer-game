'use client';
import useMovies from "@/hooks/useMovies";
import Video from "@/components/video";
import { Loader } from "lucide-react";

export default function Play({params} : {
    params: { numMovies: string };
  }) {
    const {movies, loading} = useMovies(+params.numMovies);
    
    const elems = movies?.map(movieObj => <Video key={movieObj.videoId} videoId={movieObj.videoId} movieName={movieObj.movieName} />)
  
    
  
    return (
      <>
        {loading ? (<div className="text-3xl font-sans tracking-wide text-center">
    Loading Trailers<span className="dots overflow-hidden align-baseline"></span>
</div>) : elems}
      </>
      )
  }