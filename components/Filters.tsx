import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import type { appliedFiltersType } from "@/types";
import { MoveRight } from "lucide-react";

type FiltersProps = {
  openModal: (buttonKey: string) => void;
  buttonRefs: React.MutableRefObject<{
    [key: string]: HTMLButtonElement | null;
  }>;
  stickyContainerRef: React.RefObject<HTMLDivElement>;
  appliedFilters: appliedFiltersType;
};

export default function Filters({
  openModal,
  buttonRefs,
  stickyContainerRef,
  appliedFilters,
}: FiltersProps) {
  return (
    <div
      ref={stickyContainerRef}
      className="sticky tracking-tight -ml-5 -mr-5 top-[64px] -mt-[2rem] z-[100] flex gap-5 bg-white py-[18px] px-5"
    >
      <Button
        ref={(el) => {
          buttonRefs.current["sort"] = el;
        }}
        onClick={() => openModal("sort")}
        variant={"outline"}
        className={`${appliedFilters.sort ? "border-none bg-gray-200/95 hover:bg-gray-200/95 hover:text-gray-600" : "border-gray-400 hover:bg-transparent hover:text-gray-600 hover:border-black"} rounded-full font-bold text-gray-600 flex items-center gap-1`}
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
      <Button
        ref={(el) => {
          buttonRefs.current["audScore"] = el;
        }}
        onClick={() => openModal("audScore")}
        variant={"outline"}
        className={`${appliedFilters.audScore.fresh || appliedFilters.audScore.rotten ? "border-none bg-gray-200/95 hover:bg-gray-200/95 hover:text-gray-600" : "border-gray-400 hover:bg-transparent hover:text-gray-600 hover:border-black"} rounded-full font-bold text-gray-600 flex items-center gap-1`}
      >
        AUDIENCE SCORE{" "}
        {appliedFilters.audScore.fresh && appliedFilters.audScore.rotten ? (
          <span className=" rounded-md bg-black text-white px-1">2</span>
        ) : appliedFilters.audScore.fresh || appliedFilters.audScore.rotten ? (
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
    </div>
  );
}
