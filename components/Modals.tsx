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
  const { sortCategories, toggleAudScore } = useFilteredCategories();
  // const [appliedFilters, setAppliedFilters] = useState<appliedFiltersType>({
  //   sort: null,
  //   audScore: { rotten: false, fresh: false },
  // });

  // update the UI based on search params
  useEffect(() => {
    const sortFilter = searchParams.get("sort");
    const audFresh = searchParams.get("audFresh");
    const audRotten = searchParams.get("audRotten");
    const newAppliedFilters = { ...appliedFilters };
    if (sortFilter) newAppliedFilters.sort = sortFilter;
    if (audFresh) newAppliedFilters.audScore.fresh = true;
    if (audRotten) newAppliedFilters.audScore.rotten = true;
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
          </div>
        </Modal>
      ))}
    </>
  );
}
