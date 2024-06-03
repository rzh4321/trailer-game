import Modal from "./Modal";
import { Separator } from "@/components/ui/separator";
import type { ModalState, appliedFiltersType } from "@/types";
import { useFilteredCategories } from "@/hooks/CategoryContext";
import { useState, useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MoveRight } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { updateUrlParams, removeUrlParam } from "@/lib/searchParams";

const keyToTitle: { [key: string]: string } = {
  sort: "SORT",
  audScore: "AUDIENCE SCORE",
  tomatometer: "TOMATOMETER®"
};

type ModalsProps = {
  modals: {
    [key: string]: ModalState;
  };
  closeModal: (buttonKey: string) => void;
  stickyTop: number;
  appliedFilters: appliedFiltersType;
  setAppliedFilters: React.Dispatch<React.SetStateAction<appliedFiltersType>>;
};

export default function Modals({
  modals,
  closeModal,
  stickyTop,
  appliedFilters,
  setAppliedFilters,
}: ModalsProps) {
  const searchParams = useSearchParams();
  const { sortCategories, toggleAudScore, toggleTomatometer } = useFilteredCategories();

  // update the UI based on search params
  useEffect(() => {
    const sortFilter = searchParams.get("sort");
    const audFresh = searchParams.get("audFresh");
    const audRotten = searchParams.get("audRotten");
    const tomatometerCertified = searchParams.get("tomatometer-certified");
    const tomatometerFresh = searchParams.get("tomatometer-fresh");
    const tomatometerRotten = searchParams.get("tomatometer-rotten");
    const newAppliedFilters = { ...appliedFilters };
    if (sortFilter) newAppliedFilters.sort = sortFilter;
    if (audFresh) newAppliedFilters.audScore.fresh = true;
    if (audRotten) newAppliedFilters.audScore.rotten = true;
    if (tomatometerCertified) newAppliedFilters.tomatometer.certified = true;
    if (tomatometerFresh) newAppliedFilters.tomatometer.fresh = true;
    if (tomatometerRotten) newAppliedFilters.tomatometer.rotten = true;


    setAppliedFilters(newAppliedFilters);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleSortFilter = (value: string) => {
    const newAppliedFilters = { ...appliedFilters };
    newAppliedFilters["sort"] = value;
    setAppliedFilters(newAppliedFilters);
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

  const handleToggleTomatometer = (filter: "rotten" | "fresh" | "certified") => {
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
      {Object.keys(modals).map((key) => (
        <Modal
          key={key}
          isOpen={modals[key].isOpen}
          onClose={() => closeModal(key)}
          position={modals[key].position}
          title={keyToTitle[key]}
          stickyTop={stickyTop}
        >
          <div className="flex flex-col gap-2 tracking-tight w-full px-3 text-sm font-bold text-gray-600">
            {key === "sort" && (
              <>
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
              </>
            )}
            {key === "audScore" && (
              <>
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
              </>
            )}
            {key === "tomatometer" && (
              <>
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
                        A special distinction awarded to <br></br> the best reviewed movies.
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
                        else updateUrlParams({ "tomatometer-certified": "true" });
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
                        At least 60% of reviews for a <br></br>movie are positive.
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
                          Less than 60% of reviews for a <br></br> movie
                          are positive.
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
              </>
            )}
          </div>
        </Modal>
      ))}
    </>
  );
}
