"use client";

import { useState, useEffect } from "react";
import ContentCard from "@/components/ContentCard";
import { StepForward, StepBack } from "lucide-react";
import { useFilteredCategories } from "@/hooks/CategoryContext";
import { useWindowSize } from "@uidotdev/usehooks";


export default function Home() {
  const [pageNumber, setPageNumber] = useState(1);
  const { width, height } = useWindowSize();
  const [displayCount, setDisplayCount] = useState(9);
  const {filteredCategories : categories} = useFilteredCategories();

  useEffect(() => {
    if (!width) return
    if (width > 1375) {
      setDisplayCount(12);
    }
    else if (width >= 768 && width <= 1034) {
      setDisplayCount(10);
    }
    else if (width >= 495 && width <= 734) {
      setDisplayCount(10);
    }
  }, [width])


  const startIndex = (pageNumber - 1) * displayCount;
  const endIndex = startIndex + displayCount;
  const categoriesToDisplay = categories?.slice(startIndex, endIndex);

  return (
    <>
      <div className="flex flex-col w-full gap-8">
        <div className="flex justify-between">
          <h1 className="text-3xl font-semibold tracking-tight font-gothic">Choose Category</h1>
        </div>
        <div className="flex flex-wrap gap-10">
          {categoriesToDisplay === undefined ? 
          
          Array.from({ length: displayCount }).map((_, i) => 
            <div
            key={i}
            className="bg-red-200 animate-pulse border rounded-lg shadow p-4
            w-[200px] h-[110px] md:w-[300px] md:h-[160px]"
          >

            
        </div>)
            :
            
          categoriesToDisplay!.map((category, ind) => (
            <ContentCard key={ind} categoryObject={category} />
          ))
        }
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
              categories && pageNumber + 1 <= Math.ceil(categories.length / displayCount) &&
              setPageNumber((prevPageNumber) => prevPageNumber + 1)
            }
          />
        </div>
      </div>
    </>
  );
}
