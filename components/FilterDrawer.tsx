import { useState, useEffect } from "react";
import { updateUrlParams, removeUrlParam } from "@/lib/searchParams";
import { Separator } from "./ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Checkbox } from "./ui/checkbox";
import { ChevronDown, MoveRight } from "lucide-react";
import type { appliedFiltersType } from "@/types";
import { useFilteredCategories } from "@/hooks/CategoryContext";
import Image from "next/image";

type FilterDrawerProps = {
  title: string;
  appliedFilters: appliedFiltersType;
  type: "sort" | "audience" | "tomatometer";
  setAppliedFilters: React.Dispatch<React.SetStateAction<appliedFiltersType>>;
  stickyContainerRef: React.RefObject<HTMLDivElement>;
};

export default function FilterDrawer({
  title,
  appliedFilters,
  type,
  setAppliedFilters,
  stickyContainerRef,
}: FilterDrawerProps) {
  const [clickCount, setClickCount] = useState(0);

  const { sortCategories, toggleAudScore, toggleTomatometer } =
    useFilteredCategories();

  // register window click listener to trigger effect for darkening sticky
  // container when drawer is open
  useEffect(() => {
    const handleClick = () => {
      setClickCount((prevCount) => prevCount + 1);
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  // darken sticky container when drawer is visible
  useEffect(() => {
    const drawerDiv = document.querySelector("div[role='dialog']");
    if (drawerDiv && stickyContainerRef.current) {
      stickyContainerRef.current.classList.remove("overflow-x-auto");
      stickyContainerRef.current.classList.add("opacity-20");
      setTimeout(() => {
        const drawerDiv = document.querySelector("div[role='dialog']");
        if (!drawerDiv && stickyContainerRef.current) {
          stickyContainerRef.current.classList.add("overflow-x-auto");
          stickyContainerRef.current.classList.remove("opacity-20");
        }
      }, 250);
    }
  }, [clickCount, stickyContainerRef]);

  const handleSortFilter = (value: string) => {
    const newAppliedFilters = { ...appliedFilters };
    newAppliedFilters["sort"] = value;
    setAppliedFilters(newAppliedFilters);
  };

  const handleOpenDrawer = () => {
    if (stickyContainerRef.current) {
      stickyContainerRef.current.classList;
    }
  };

  const handleToggleAudScore = (filter: "rotten" | "fresh") => {
    const oldAudScoreFilterVal = appliedFilters.audScore[filter];
    const newAudScoreFilter = {
      ...appliedFilters.audScore,
      [filter]: !oldAudScoreFilterVal,
    };
    const newAppliedFilters = {
      ...appliedFilters,
      audScore: newAudScoreFilter,
    };
    setAppliedFilters(newAppliedFilters);
  };

  const handleToggleTomatometer = (
    filter: "rotten" | "fresh" | "certified",
  ) => {
    const oldTomatometerFilterVal = appliedFilters.tomatometer[filter];
    const newTomatometerFilter = {
      ...appliedFilters.tomatometer,
      [filter]: !oldTomatometerFilterVal,
    };
    const newAppliedFilters = {
      ...appliedFilters,
      tomatometer: newTomatometerFilter,
    };
    setAppliedFilters(newAppliedFilters);
  };
  return (
    <>
      <Drawer>
        <DrawerTrigger asChild>
          {type === "sort" ? (
            <Button
              variant={"outline"}
              className={` filter-btn ${appliedFilters.sort ? "border-none bg-gray-200/95 hover:bg-gray-200/95 hover:text-gray-600" : "border-gray-400 hover:bg-transparent hover:text-gray-600 hover:border-black"} rounded-full font-bold text-gray-600 flex items-center gap-1`}
            >
              <div>
                SORT
                {appliedFilters.sort === "AToZ" ? (
                  <>
                    <span>: A </span>
                    <MoveRight strokeWidth={3} className="w-[12px] inline" />
                    <span> Z</span>
                  </>
                ) : appliedFilters.sort === "highest" ? (
                  <>
                    <span>: TOMATOMETER® </span>
                    <span className="text-[13px]"> (HIGHEST)</span>
                  </>
                ) : appliedFilters.sort === "lowest" ? (
                  <>
                    <span>: TOMATOMETER® </span>
                    <span className="text-[13px]"> (LOWEST)</span>
                  </>
                ) : appliedFilters.sort === "audHighest" ? (
                  <>
                    <span>: AUDIENCE SCORE </span>
                    <span className="text-[13px]"> (HIGHEST)</span>
                  </>
                ) : appliedFilters.sort === "audLowest" ? (
                  <>
                    <span>: AUDIENCE SCORE </span>
                    <span className="text-[13px]"> (LOWEST)</span>
                  </>
                ) : (
                  ""
                )}
              </div>
              <ChevronDown className="ml-1" width={13} strokeWidth={3} />
            </Button>
          ) : type === "audience" ? (
            <Button
              variant={"outline"}
              className={`${appliedFilters.audScore.fresh || appliedFilters.audScore.rotten ? "border-none bg-gray-200/95 hover:bg-gray-200/95 hover:text-gray-600" : "border-gray-400 hover:bg-transparent hover:text-gray-600 hover:border-black"} filter-btn rounded-full font-bold text-gray-600 flex items-center gap-1`}
            >
              AUDIENCE SCORE{" "}
              {appliedFilters.audScore.fresh &&
              appliedFilters.audScore.rotten ? (
                <span className=" rounded-md bg-black text-white px-1">2</span>
              ) : appliedFilters.audScore.fresh ||
                appliedFilters.audScore.rotten ? (
                <span className=" rounded-md bg-black text-white px-1">1</span>
              ) : (
                ""
              )}
              <ChevronDown
                className={`${appliedFilters.audScore.fresh || appliedFilters.audScore.rotten ? "ml-0" : "ml-1"}`}
                width={13}
                strokeWidth={3}
              />
            </Button>
          ) : (
            <Button
              variant={"outline"}
              className={`${appliedFilters.tomatometer.certified || appliedFilters.tomatometer.fresh || appliedFilters.tomatometer.rotten ? "border-none bg-gray-200/95 hover:bg-gray-200/95 hover:text-gray-600" : "border-gray-400 hover:bg-transparent hover:text-gray-600 hover:border-black"} filter-btn rounded-full font-bold text-gray-600 flex items-center gap-1`}
            >
              TOMATOMETER®{" "}
              {appliedFilters.tomatometer.certified &&
              appliedFilters.tomatometer.fresh &&
              appliedFilters.tomatometer.rotten ? (
                <span className=" rounded-md bg-black text-white px-1">3</span>
              ) : (appliedFilters.tomatometer.certified &&
                  appliedFilters.tomatometer.fresh) ||
                (appliedFilters.tomatometer.certified &&
                  appliedFilters.tomatometer.rotten) ||
                (appliedFilters.tomatometer.fresh &&
                  appliedFilters.tomatometer.rotten) ? (
                <span className=" rounded-md bg-black text-white px-1">2</span>
              ) : appliedFilters.tomatometer.certified ||
                appliedFilters.tomatometer.fresh ||
                appliedFilters.tomatometer.rotten ? (
                <span className=" rounded-md bg-black text-white px-1">1</span>
              ) : (
                ""
              )}
              <ChevronDown
                className={`${appliedFilters.tomatometer.certified || appliedFilters.tomatometer.fresh || appliedFilters.tomatometer.rotten ? "ml-0" : "ml-1"}`}
                width={13}
                strokeWidth={3}
              />
            </Button>
          )}
        </DrawerTrigger>
        <DrawerContent className="mb-5">
          <div className="w-full p-[15px]">
            <DrawerHeader className="mb-[25px] p-0">
              <DrawerTitle className="text-center">{title}</DrawerTitle>
            </DrawerHeader>

            {type === "sort" ? (
              <div className="flex flex-col gap-[10px] tracking-tight w-full text-sm font-bold text-gray-600">
                <label htmlFor="AToZ">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-1">
                      <span>A</span>
                      <MoveRight className="w-[15px]" />
                      <span>Z</span>
                    </div>
                    <RadioGroup>
                      <RadioGroupItem
                        id="AToZ"
                        checked={appliedFilters["sort"] === "AToZ"}
                        className="h-[26px] w-[26px] fill-blue-400 stroke-blue-400 p-0"
                        value="AToZ"
                        onClick={() => {
                          sortCategories("AToZ");
                          handleSortFilter("AToZ");
                          updateUrlParams({ sort: "AToZ" });
                        }}
                      />
                    </RadioGroup>
                  </div>
                </label>
                <Separator />
                <label htmlFor="highest">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-1 items-center">
                      TOMATOMETER®{" "}
                      <span className="text-[13px]">(HIGHEST)</span>
                    </div>
                    <RadioGroup>
                      <RadioGroupItem
                        id="highest"
                        checked={appliedFilters["sort"] === "highest"}
                        className="h-[26px] w-[26px] fill-blue-400 stroke-blue-400 p-0"
                        value="highest"
                        onClick={() => {
                          sortCategories("highest");
                          handleSortFilter("highest");
                          updateUrlParams({ sort: "highest" });
                        }}
                      />
                    </RadioGroup>
                  </div>
                </label>
                <Separator />
                <label htmlFor="lowest">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-1 items-center">
                      TOMATOMETER®{" "}
                      <span className="text-[13px]">(LOWEST)</span>
                    </div>
                    <RadioGroup>
                      <RadioGroupItem
                        id="lowest"
                        checked={appliedFilters["sort"] === "lowest"}
                        className="h-[26px] w-[26px] fill-blue-400 stroke-blue-400 p-0"
                        value="lowest"
                        onClick={() => {
                          sortCategories("lowest");
                          handleSortFilter("lowest");
                          updateUrlParams({ sort: "lowest" });
                        }}
                      />
                    </RadioGroup>
                  </div>
                </label>
                <Separator />
                <label htmlFor="audHighest">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-1 items-center">
                      AUDIENCE SCORE{" "}
                      <span className="text-[13px]">(HIGHEST)</span>
                    </div>
                    <RadioGroup>
                      <RadioGroupItem
                        id="audHighest"
                        checked={appliedFilters["sort"] === "audHighest"}
                        className="h-[26px] w-[26px] fill-blue-400 stroke-blue-400 p-0"
                        value="audHighest"
                        onClick={() => {
                          sortCategories("audHighest");
                          handleSortFilter("audHighest");
                          updateUrlParams({ sort: "audHighest" });
                        }}
                      />
                    </RadioGroup>
                  </div>
                </label>
                <Separator />
                <label htmlFor="audLowest">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-1 items-center">
                      AUDIENCE SCORE{" "}
                      <span className="text-[13px]">(LOWEST)</span>
                    </div>
                    <RadioGroup>
                      <RadioGroupItem
                        id="audLowest"
                        checked={appliedFilters["sort"] === "audLowest"}
                        className="h-[26px] w-[26px] fill-blue-400 stroke-blue-400 p-0"
                        value="audLowest"
                        onClick={() => {
                          sortCategories("audLowest");
                          handleSortFilter("audLowest");
                          updateUrlParams({ sort: "audLowest" });
                        }}
                      />
                    </RadioGroup>
                  </div>
                </label>
              </div>
            ) : type === "audience" ? (
              <div className="flex flex-col gap-[10px] tracking-tight w-full text-sm font-bold text-gray-600">
                <label htmlFor="audFresh">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-4 items-start">
                      <Image
                        alt="audience"
                        height={30}
                        width={30}
                        src={
                          "https://www.rottentomatoes.com/assets/pizza-pie/images/icons/audience/aud_score-fresh.6c24d79faaf.svg"
                        }
                      />
                      <div className="flex flex-col mt-1">
                        <span>FRESH</span>
                        <span className="text-[0.875rem] font-normal">
                          At least 60% of reviews for a<br></br> movie or TV
                          show are positive.
                        </span>
                      </div>
                    </div>
                    <Checkbox
                      id="audFresh"
                      checked={appliedFilters["audScore"]?.fresh}
                      className="h-[26px] w-[26px] border-[0.5px]"
                      onClick={() => {
                        toggleAudScore("fresh");
                        handleToggleAudScore("fresh");
                        if (appliedFilters.audScore.fresh)
                          removeUrlParam("audFresh");
                        else updateUrlParams({ audFresh: "true" });
                      }}
                    />
                  </div>
                </label>
                <Separator />
                <label htmlFor="audRotten">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-4 items-start">
                      <Image
                        alt="audience"
                        height={30}
                        width={30}
                        src={
                          "https://www.rottentomatoes.com/assets/pizza-pie/images/icons/audience/aud_score-rotten.f419e4046b7.svg"
                        }
                      />
                      <div className="flex flex-col mt-1">
                        <span>ROTTEN</span>
                        <span className="text-[0.875rem] font-normal">
                          Less than 60% of reviews for a <br></br> movie or TV
                          show are positive.
                        </span>
                      </div>
                    </div>
                    <Checkbox
                      id="audRotten"
                      checked={appliedFilters["audScore"]?.rotten}
                      className="h-[26px] w-[26px] border-[0.5px]"
                      onClick={() => {
                        toggleAudScore("rotten");
                        handleToggleAudScore("rotten");
                        if (appliedFilters.audScore.rotten)
                          removeUrlParam("audRotten");
                        else updateUrlParams({ audRotten: "true" });
                      }}
                    />
                  </div>
                </label>
              </div>
            ) : type === "tomatometer" ? (
              <div className="flex flex-col gap-[10px] tracking-tight w-full text-sm font-bold text-gray-600">
                <label htmlFor="certified">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-4 items-start">
                      <Image
                        alt="certified"
                        height={30}
                        width={30}
                        src={
                          "https://www.rottentomatoes.com/assets/pizza-pie/images/icons/tomatometer/certified_fresh-notext.56a89734a59.svg"
                        }
                      />
                      <div className="flex flex-col mt-1">
                        <span>CERTIFIED FRESH</span>
                        <span className="text-[0.875rem] font-normal">
                          A special distinction awarded to <br></br> the best
                          reviewed movies.
                        </span>
                      </div>
                    </div>
                    <Checkbox
                      id="certified"
                      checked={appliedFilters["tomatometer"]?.certified}
                      className="h-[26px] w-[26px] border-[0.5px]"
                      onClick={() => {
                        toggleTomatometer("certified");
                        handleToggleTomatometer("certified");
                        if (appliedFilters.tomatometer.certified)
                          removeUrlParam("tomatometer-certified");
                        else
                          updateUrlParams({ "tomatometer-certified": "true" });
                      }}
                    />
                  </div>
                </label>
                <Separator />
                <label htmlFor="tomatometer-fresh">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-4 items-start">
                      <Image
                        alt="tomatometer-fresh"
                        height={30}
                        width={30}
                        src={
                          "https://www.rottentomatoes.com/assets/pizza-pie/images/icons/tomatometer/tomatometer-fresh.149b5e8adc3.svg"
                        }
                      />
                      <div className="flex flex-col mt-1">
                        <span>FRESH</span>
                        <span className="text-[0.875rem] font-normal">
                          At least 60% of reviews for a <br></br>movie are
                          positive.
                        </span>
                      </div>
                    </div>
                    <Checkbox
                      id="tomatometer-fresh"
                      checked={appliedFilters["tomatometer"]?.fresh}
                      className="h-[26px] w-[26px] border-[0.5px]"
                      onClick={() => {
                        toggleTomatometer("fresh");
                        handleToggleTomatometer("fresh");
                        if (appliedFilters.tomatometer.fresh)
                          removeUrlParam("tomatometer-fresh");
                        else updateUrlParams({ "tomatometer-fresh": "true" });
                      }}
                    />
                  </div>
                </label>
                <Separator />
                <label htmlFor="tomatometer-rotten">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-4 items-start">
                      <Image
                        alt="tomatometer-rotten"
                        height={30}
                        width={30}
                        src={
                          "https://www.rottentomatoes.com/assets/pizza-pie/images/icons/tomatometer/tomatometer-rotten.f1ef4f02ce3.svg"
                        }
                      />
                      <div className="flex flex-col mt-1">
                        <span>ROTTEN</span>
                        <span className="text-[0.875rem] font-normal">
                          Less than 60% of reviews for a <br></br> movie are
                          positive.
                        </span>
                      </div>
                    </div>
                    <Checkbox
                      id="tomatometer-rotten"
                      checked={appliedFilters["tomatometer"]?.rotten}
                      className="h-[26px] w-[26px] border-[0.5px]"
                      onClick={() => {
                        toggleTomatometer("rotten");
                        handleToggleTomatometer("rotten");
                        if (appliedFilters.tomatometer.rotten)
                          removeUrlParam("tomatometer-rotten");
                        else updateUrlParams({ "tomatometer-rotten": "true" });
                      }}
                    />
                  </div>
                </label>
              </div>
            ) : (
              <></>
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
