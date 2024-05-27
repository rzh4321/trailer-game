"use client";

import { useState } from "react";
import ContentCard from "@/components/ContentCard";
import { StepForward, StepBack } from "lucide-react";
import { useFilteredCategories } from "@/hooks/CategoryContext";

export default function Home() {
  const [pageNumber, setPageNumber] = useState(1);
  const {filteredCategories : categories} = useFilteredCategories();

  const startIndex = (pageNumber - 1) * 9;
  const endIndex = startIndex + 9;
  const categoriesToDisplay = categories?.slice(startIndex, endIndex);

  return (
    <>
      <div className="flex flex-col w-full gap-8">
        <div className="flex justify-between">
          <h1 className="text-3xl font-semibold tracking-tight font-gothic">Choose Category</h1>
        </div>
        <div className="flex flex-wrap lg:justify-between gap-10">
          {categoriesToDisplay === undefined ? 
          
          Array.from({ length: 9 }).map((_, i) => 
            <div
            key={i}
            className="bg-red-200 animate-pulse border rounded-lg shadow p-4
              w-32 h-32 sm:w-48 sm:h-48 md:w-[300px] md:h-[200px]
              lg:w-72 lg:h-72 xl:w-96 xl:h-96"
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
              categories && pageNumber + 1 <= Math.ceil(categories.length / 9) &&
              setPageNumber((prevPageNumber) => prevPageNumber + 1)
            }
          />
        </div>
      </div>
    </>
  );
}
