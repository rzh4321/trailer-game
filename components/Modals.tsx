import Modal from "./Modal"
import { Separator } from "@/components/ui/separator"
import type { ModalState } from "@/types";
import { useFilteredCategories } from "@/hooks/CategoryContext";
import { Button } from "./ui/button";

type ModalsProps = {
    modals:  {
        [key: string]: ModalState;
    };
    closeModal: (buttonKey: string) => void;
}

export default function Modals({ modals, closeModal} : ModalsProps) {
    const {sortCategories} = useFilteredCategories();

    return (
        <>
        {Object.keys(modals).map((key) => (
            <Modal
              key={key}
              isOpen={modals[key].isOpen}
              onClose={() => closeModal(key)}
              position={modals[key].position}
            >
              {key === 'sort' && (
                <div className="flex flex-col gap-3">
                  <Button onClick={() => sortCategories('AToZ')} className="text-gray-700 hover:text-gray-900">A {'->'} Z</Button>
                  <Button onClick={() => sortCategories('highest')} className="text-gray-700 hover:text-gray-900">Highest</Button>
                  <Button onClick={() => sortCategories('lowest')} className="text-gray-700 hover:text-gray-900">Lowest</Button>
                </div>
              )}
              {key === 'filter' && (
                <div className="flex flex-col gap-3">
                  <button className="text-gray-700 hover:text-gray-900">Category 1</button>
                  <button className="text-gray-700 hover:text-gray-900">Category 2</button>
                  <button className="text-gray-700 hover:text-gray-900">Category 3</button>
                </div>
              )}
            </Modal>
          ))}
            
        
        
        </>)}
