"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useWindowScroll } from "react-use";
import { Button } from "./ui/button";
import Image from "next/image";
import { useFilteredCategories } from "@/hooks/CategoryContext";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { Label } from "./ui/label";

export default function NavBar() {
  const {filterCategories} = useFilteredCategories();
  const { y: pageYOffset } = useWindowScroll(); // to determine if navbar is sticky
  const [scrolled, setScrolled] = useState(false);
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    filterCategories(e.target.value);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(pageYOffset > 0);
    onScroll(); // Call on mount for initial check
  }, [pageYOffset]); // Only re-run the effect if pageYOffset changes

  return (
    <div
      className={`self-end flex justify-between w-full items-center px-5 py-8 h-3 sticky top-0 z-50 transition-all duration-300 bg-tomatoes ${
        scrolled ? "shadow-md border-b border-gray-600" : null
      }`}
    >
      <Link
        href="/"
        className="cursor-pointer flex gap-1 items-end tracking-wider text-xl"
      >
        <Image
          alt="logo"
          src={"/icon.ico"}
          width={30}
          height={0}
        />
        <span className="hidden sm:block font-poppins tracking-tight text-white font-semibold">TRAILERMETER</span>
      </Link>
      <div className="relative">
        <Label htmlFor="search">
          <Search stroke="white" width={20} className="absolute top-1/2 left-4 -translate-y-1/2" />
        </Label>
        <Input id="search" className="w-[400px] ring-inset border-[1px] focus-visible:border-transparent bg-search border-white pl-11 text-md rounded-3xl text-white" value={search} onChange={handleSearch} placeholder="Search categories..." />
      </div>
      <div className="flex gap-3">
        <Button className="bg-inherit text-white font-bold" asChild>
          <Link className="tracking-tighter font-bold hover:bg-white hover:text-black" href={"/play/all/1"}>QUICK PLAY</Link>
        </Button>

        {/* <ProfileDropdown /> */}
      </div>
    </div>
  );
}
