"use client";

import { useState } from "react";
import getMovies from "@/actions/getMovies";
import Video from "@/components/Game";
import { useEffect } from "react";
import useMovies from "@/hooks/useMovies";
import getYouTubeUrl from "@/actions/getYouTubeUrl";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <Button onClick={() => router.push("/play/1")}>Quick Game</Button>
    </>
  );
}
