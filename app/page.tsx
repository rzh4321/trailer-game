'use client';

import { useState } from 'react';
import getMovies from '@/actions/getMovies';
import Video from '@/components/video';
import { useEffect } from 'react';
import useMovies from '@/hooks/useMovies';
import getYouTubeUrl from '@/actions/getYouTubeUrl';

export default function Home() {
  const {movies, loading} = useMovies(5);
  
  const elems = movies?.map(movieObj => <Video key={movieObj.videoId} videoId={movieObj.videoId} movieName={movieObj.movieName} />)

  

  return (
    <>
      {loading ? <div>loading...</div> : elems}
    </>
    )
}