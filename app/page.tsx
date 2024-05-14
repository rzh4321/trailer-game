"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import categories from "@/categories";
import ContentCard from "@/components/ContentCard";
import { StepForward, StepBack } from "lucide-react";

export default function Home() {
  const [pageNumber, setPageNumber] = useState(1);

  const router = useRouter();
  const startIndex = (pageNumber - 1) * 9;
  const endIndex = startIndex + 9;
  const categoriesToDisplay = categories.slice(startIndex, endIndex);

  return (
    <>
      <div className="flex flex-col w-full gap-8">
        <div className="flex justify-between">
          <h1 className="text-4xl font-semibold">Choose Mode</h1>
        </div>
        <div className="flex flex-wrap lg:justify-between gap-10">
          {categoriesToDisplay.map((category, ind) => (
            <ContentCard key={ind} categoryObject={category} />
          ))}
        </div>
        <div className="flex justify-center items-center gap-4 mb-10">
          <StepBack
            className="cursor-pointer"
            onClick={() =>
              setPageNumber((prevPageNumber) => Math.max(prevPageNumber - 1, 1))
            }
          />
          <span>{pageNumber}</span>
          <StepForward
            className="cursor-pointer"
            onClick={() =>
              pageNumber + 1 < Math.ceil(categories.length / 9) &&
              setPageNumber((prevPageNumber) => prevPageNumber + 1)
            }
          />
        </div>
      </div>
    </>
  );
}
