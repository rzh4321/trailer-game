import Modal from "./Modal"
import { Separator } from "@/components/ui/separator"
import type { ModalState } from "@/types";
import { useFilteredCategories } from "@/hooks/CategoryContext";
import { Button } from "./ui/button";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MoveRight } from "lucide-react";




type ModalsProps = {
    modals:  {
        [key: string]: ModalState;
    };
    closeModal: (buttonKey: string) => void;
}

type appliedFiltersType = {
  [key: string] : string | null;
};

export default function Modals({ modals, closeModal} : ModalsProps) {
    const {sortCategories} = useFilteredCategories();
    const [appliedFilters, setAppliedFilters] = useState<appliedFiltersType>({
      sort: null
    })

    const handleApplyFilter = (key: string, value: string) => {
      const newAppliedFilters = {...appliedFilters};
      newAppliedFilters[key] = value;
      setAppliedFilters(newAppliedFilters);
    }

    console.log(appliedFilters)

    return (
        <>
        {Object.keys(modals).map((key) => (
            <Modal
              key={key}
              isOpen={modals[key].isOpen}
              onClose={() => closeModal(key)}
              position={modals[key].position}
              title={'SORT'}
            >
              
                <div className="flex flex-col gap-2 w-full px-3 text-sm font-bold text-gray-600">
                {key === 'sort' && (
                  <>
                    <div className="flex justify-between items-center">
                        <div className="flex gap-1"><span>A</span><MoveRight className="w-[15px]" /><span>Z</span></div>
                        <RadioGroup>
                          <RadioGroupItem checked={appliedFilters['sort'] === 'AToZ'} onClickCapture={() => handleApplyFilter('sort', 'AToZ')} className="h-[26px] w-[26px] fill-blue-400 stroke-blue-400 p-0" value="AToZ" onClick={() => sortCategories('AToZ')} />
                        </RadioGroup>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                        <div className="flex gap-1 items-center">TOMATOMETER® <span className="text-[13px]">(HIGHEST)</span></div>
                        <RadioGroup>
                          <RadioGroupItem checked={appliedFilters['sort'] === 'highest'} onClickCapture={() => handleApplyFilter('sort', 'highest')} className="h-[26px] w-[26px] fill-blue-400 stroke-blue-400 p-0" value="highest" onClick={() => sortCategories('highest')} />
                        </RadioGroup>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                    <div className="flex gap-1 items-center">TOMATOMETER® <span className="text-[13px]">(LOWEST)</span></div>
                        <RadioGroup>
                          <RadioGroupItem checked={appliedFilters['sort'] === 'lowest'} onClickCapture={() => handleApplyFilter('sort', 'lowest')} className="h-[26px] w-[26px] fill-blue-400 stroke-blue-400 p-0" value="lowest" onClick={() => sortCategories('lowest')} />
                        </RadioGroup>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                        <div className="flex gap-1 items-center">AUDIENCE SCORE <span className="text-[13px]">(HIGHEST)</span></div>
                        <RadioGroup>
                          <RadioGroupItem checked={appliedFilters['sort'] === 'audHighest'} onClickCapture={() => handleApplyFilter('sort', 'audHighest')} className="h-[26px] w-[26px] fill-blue-400 stroke-blue-400 p-0" value="audHighest" onClick={() => sortCategories('audHighest')} />
                        </RadioGroup>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                    <div className="flex gap-1 items-center">AUDIENCE SCORE <span className="text-[13px]">(LOWEST)</span></div>
                        <RadioGroup>
                          <RadioGroupItem checked={appliedFilters['sort'] === 'audLowest'} onClickCapture={() => handleApplyFilter('sort', 'audLowest')} className="h-[26px] w-[26px] fill-blue-400 stroke-blue-400 p-0" value="audLowest" onClick={() => sortCategories('audLowest')} />
                        </RadioGroup>
                    </div>
                  </>
                  )}
                  {key === 'filter' && (
                    <div className="flex flex-col gap-3">
                      <button className="text-gray-700 hover:text-gray-900">Category 1</button>
                      <button className="text-gray-700 hover:text-gray-900">Category 2</button>
                      <button className="text-gray-700 hover:text-gray-900">Category 3</button>
                    </div>
                  )
                
                }
                </div>


            </Modal>
          ))}
            
        
        
        </>)}
