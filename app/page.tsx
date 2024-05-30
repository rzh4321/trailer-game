"use client";

import { useState, useEffect, useRef } from "react";
import ContentCard from "@/components/ContentCard";
import { useFilteredCategories } from "@/hooks/CategoryContext";
import { Button } from "@/components/ui/button";
import useCellSize from "@/hooks/useCellSize";
import { useWindowScroll } from "react-use";
import { ChevronUp } from "lucide-react";
import Filters from "@/components/Filters";
import Modals from "@/components/Modals";
import type { ModalState } from "@/types";


export default function Home() {
  const { cellRef, cellSize } = useCellSize();
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const { y: pageYOffset } = useWindowScroll(); // to see when scroll button should appear
  const [isHalfwayScrolled, setIsHalfwayScrolled] = useState(false);
  const [modals, setModals] = useState<{ [key: string]: ModalState }>({
    sort: { isOpen: false, position: null },
    audScore: { isOpen: false, position: null },
  });
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const stickyContainerRef = useRef<HTMLDivElement>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [stickyRefTop, setStickyRefTop] = useState(0);
  const {filteredCategories : categories} = useFilteredCategories();

  const openModal = (buttonKey: string) => {
    const button = buttonRefs.current[buttonKey];
    if (button) {
      const alreadyOpen = modals[buttonKey].isOpen;
      const rect = button.getBoundingClientRect();
        const resetState = Object.keys(modals).reduce((acc, key) => {
          acc[key] = { isOpen: false, position: null };
          return acc;
        }, {} as { [key: string]: ModalState });
    
        resetState[buttonKey] = { isOpen: !alreadyOpen, position: { top: rect.bottom, left: rect.left } };
    
        setModals(resetState);
      }
  };

  const closeModal = (buttonKey: string) => {
    setModals((prevModals) => ({
      ...prevModals,
      [buttonKey]: { isOpen: false, position: null },
    }));
  };


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
      const threshold = document.documentElement.scrollHeight / 3;
      setIsHalfwayScrolled(pageYOffset > threshold);
    };

    handleScroll(); // Initial check
  }, [pageYOffset]);

  // close modal if filter div goes from sticky to relative or vice versa
  useEffect(() => {
    const handleScroll = () => {
      if (stickyContainerRef.current) {
        
        const rect = stickyContainerRef.current.getBoundingClientRect();
        console.log(rect.top)
        if (rect.top == 64) {
          if (stickyRefTop !== 64) {
            Object.keys(modals).forEach((key) => closeModal(key));
          }
        }
        else {
          if (stickyRefTop === 64) {
            Object.keys(modals).forEach((key) => closeModal(key));

          }
        }
        setStickyRefTop(rect.top);
        // if (rect.top !== 64) { // Assuming 64px is the sticky top position
          // Object.keys(modals).forEach((key) => closeModal(key));
        // }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [modals]);

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
      <Modals modals={modals} closeModal={closeModal} stickyTop={stickyRefTop} />



      <div className="flex flex-col w-full gap-8">
        <div className="flex justify-between">
          <h1 className="text-3xl font-semibold tracking-tight font-gothic">Choose Category</h1>
        </div>
        <Filters openModal={openModal} buttonRefs={buttonRefs} stickyContainerRef={stickyContainerRef} />

        <div className="grid gap-10  -mt-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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
