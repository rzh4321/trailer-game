import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import type { appliedFiltersType } from "@/types";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import { useFilteredCategories } from "@/hooks/CategoryContext";
import { removeUrlParam, updateUrlParams } from "@/lib/searchParams";
import { useWindowSize } from "@uidotdev/usehooks";
import FilterDrawer from "./FilterDrawer";

type FiltersProps = {
  openModal: (buttonKey: string) => void;
  buttonRefs: React.MutableRefObject<{
    [key: string]: HTMLButtonElement | null;
  }>;
  stickyContainerRef: React.RefObject<HTMLDivElement>;
  appliedFilters: appliedFiltersType;
  setAppliedFilters: React.Dispatch<React.SetStateAction<appliedFiltersType>>;
};

export default function Filters({
  openModal,
  buttonRefs,
  stickyContainerRef,
  appliedFilters,
  setAppliedFilters,
}: FiltersProps) {
  const { toggleCertifiedFresh } = useFilteredCategories();
  const { width, height } = useWindowSize();

  return (
    <div
      ref={stickyContainerRef}
      className="sticky tracking-tight overflow-x-auto -ml-5 -mr-5 top-[64px] -mt-[2rem] z-[100] flex gap-5 bg-white py-[18px] px-5"
    >
      {width! >= 768 ? (
        <>
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
          <Button
            ref={(el) => {
              buttonRefs.current["tomatometer"] = el;
            }}
            onClick={() => openModal("tomatometer")}
            variant={"outline"}
            className={`${appliedFilters.tomatometer.certified || appliedFilters.tomatometer.fresh || appliedFilters.tomatometer.rotten ? "border-none bg-gray-200/95 hover:bg-gray-200/95 hover:text-gray-600" : "border-gray-400 hover:bg-transparent hover:text-gray-600 hover:border-black"} rounded-full font-bold text-gray-600 flex items-center gap-1`}
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
        </>
      ) : (
        <>
          <FilterDrawer
            title="SORT"
            appliedFilters={appliedFilters}
            setAppliedFilters={setAppliedFilters}
            type="sort"
            stickyContainerRef={stickyContainerRef}
          />
          <FilterDrawer
            title="AUDIENCE SCORE"
            appliedFilters={appliedFilters}
            setAppliedFilters={setAppliedFilters}
            type="audience"
            stickyContainerRef={stickyContainerRef}
          />
          <FilterDrawer
            title="TOMATOMETER"
            appliedFilters={appliedFilters}
            setAppliedFilters={setAppliedFilters}
            type="tomatometer"
            stickyContainerRef={stickyContainerRef}
          />
        </>
      )}

      <Button
        onClick={() => {
          setAppliedFilters((prev) => ({
            ...prev,
            certifiedFresh: !prev.certifiedFresh,
          }));
          toggleCertifiedFresh();
          if (appliedFilters.certifiedFresh) removeUrlParam("certified-fresh");
          else updateUrlParams({ "certified-fresh": "true" });
        }}
        variant={"outline"}
        className={`filter-btn flex-shrink-0 ${appliedFilters.certifiedFresh ? "border-none bg-gray-200/95 hover:bg-gray-200/95 hover:text-gray-600" : "border-gray-400 hover:bg-transparent hover:text-gray-600 hover:border-black"} rounded-full font-bold text-gray-600 flex items-center gap-1`}
      >
        <Image
          alt="certified-fresh"
          height={18}
          width={18}
          src={
            "https://www.rottentomatoes.com/assets/pizza-pie/images/icons/tomatometer/certified_fresh-notext.56a89734a59.svg"
          }
        />
        <span>CERTIFIED FRESH</span>
      </Button>
    </div>
  );
}
