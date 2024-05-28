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
import { usePathname } from "next/navigation";

export default function NavBar() {
  const {filterCategories} = useFilteredCategories();
  const [search, setSearch] = useState("");
  const pathname = usePathname();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    filterCategories(e.target.value);
  };


  return (
    <div
      className={`self-end flex justify-between w-full items-center px-5 py-8 h-3 sticky top-0 z-50 transition-all duration-300 bg-tomatoes`}
    >
      <Link
        href="/"
        className="cursor-pointer flex-shrink-0 flex gap-1 items-end tracking-wider text-xl"
      >
        <Image
          alt="logo"
          src={"/icon.ico"}
          width={30}
          height={0}
        />
        <span className="hidden sm:block font-poppins tracking-tight text-white font-semibold">TRAILERMETER</span>
      </Link>
      {pathname === '/' && <div className="relative flex-shrink w-full md:w-auto ml-5 md:ml-2">
        <Label htmlFor="search">
          <Search stroke="white" width={20} className="absolute top-1/2 left-4 -translate-y-1/2" />
        </Label>
        <Input id="search" type="search" className="md:w-[434px] w-full ring-inset ring-white border-[1px] focus-visible:border-transparent bg-search border-white pl-11 text-md rounded-3xl text-white" value={search} onChange={handleSearch} placeholder="Search categories..." />
      </div>}
      <div className="gap-3 hidden md:flex">
        <Button className="bg-inherit text-white font-bold" asChild>
          <Link className="tracking-tighter font-bold hover:bg-white hover:text-black" href={"/play/all/1"}>QUICK PLAY</Link>
        </Button>

        {/* <ProfileDropdown /> */}
      </div>
    </div>
  );
}
