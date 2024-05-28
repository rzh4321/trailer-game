"use client";

import { useState, useEffect } from "react";
import ContentCard from "@/components/ContentCard";
import { useFilteredCategories } from "@/hooks/CategoryContext";
import { Button } from "@/components/ui/button";
import useCellSize from "@/hooks/useCellSize";
import { useWindowScroll } from "react-use";
import { ChevronUp } from "lucide-react";
import { useWindowSize } from "@uidotdev/usehooks";



export default function Home() {
  const { cellRef, cellSize } = useCellSize();
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const { y: pageYOffset } = useWindowScroll(); // to see when scroll button should appear
  const [isHalfwayScrolled, setIsHalfwayScrolled] = useState(false);

  const [pageNumber, setPageNumber] = useState(1);
  const {filteredCategories : categories} = useFilteredCategories();


  const handleLoadMore = () => {
    setPageNumber(prev => prev + 1);
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // for smooth scrolling
    });
  };

  const calculateItemsPerPage = (windowWidth: number, windowHeight: number, cellWidth: number, cellHeight: number) => {
    const columns = Math.floor(windowWidth / cellWidth);
    const rows = Math.floor(windowHeight / cellHeight) * 2;
    return columns * rows;
  };

  const categoriesToDisplay = categories?.slice(0, pageNumber * itemsPerPage);

  useEffect(() => {
    if (cellSize.width && cellSize.height) {
      const items = calculateItemsPerPage(window.innerWidth, window.innerHeight, cellSize.width, cellSize.height);
      setItemsPerPage(items);
    }
  }, [cellSize]);

  useEffect(() => {
    const handleScroll = () => {
      const halfwayPoint = document.documentElement.scrollHeight / 2;
      setIsHalfwayScrolled(pageYOffset > halfwayPoint);
    };

    handleScroll(); // Initial check
  }, [pageYOffset]);

  return (
    <>
     {isHalfwayScrolled && (
        <Button
        onClick={handleScrollToTop}
          className="fixed bottom-1/4 z-[100] right-5 px-2 py-3 bg-gray-900/70 hover:bg-black stroke-slate-300 hover:stroke-white"
        >
          <ChevronUp width={35} height={55} strokeWidth={3} className='stroke-inherit' />
        </Button>
      )}
      <div className="flex flex-col w-full gap-8">
        <div className="flex justify-between">
          <h1 className="text-3xl font-semibold tracking-tight font-gothic">Choose Category</h1>
        </div>
        <div className="grid gap-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {categoriesToDisplay === undefined ? 
          
          Array.from({ length: 10 }).map((_, i) => 
            <div
            key={i}
            className="bg-red-200 animate-pulse border rounded-lg shadow p-0 aspect-w-1 aspect-h-1
            sm:min-h-[200px] min-h-[230px]"
          >

            
        </div>)
            :
            
          categoriesToDisplay!.map((category, ind) => (
            <ContentCard key={ind} cellRef={cellRef} categoryObject={category} />
          ))
        }
        </div>
        
        <div className="flex flex-col items-center justify-center my-4">
        {categoriesToDisplay && categories && categoriesToDisplay.length < categories.length ? (
          <Button
            onClick={handleLoadMore}
            className=" bg-blue-600 text-white tracking-tighter font-bold hover:bg-blue-700"
          >
            LOAD MORE
          </Button>) : categoriesToDisplay !== undefined ? (
            <>
            <div className='tracking-wider text-gray-500 text-lg'>{"You've reached the end"}</div>
            <Button variant={'link'} className=" text-xs underline" onClick={handleScrollToTop}>Go Back Up</Button>
            
            </>
          )
        : ""
        
        }
        </div>
      
      </div>
    </>
  );
}
