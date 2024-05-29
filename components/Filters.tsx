import { Button } from "./ui/button"
import { ChevronDown } from "lucide-react";

type FiltersProps = {
    openModal: (buttonKey: string) => void;
    buttonRefs: React.MutableRefObject<{
        [key: string]: HTMLButtonElement | null;
    }>;
    stickyContainerRef: React.RefObject<HTMLDivElement>
}

export default function Filters({openModal, buttonRefs, stickyContainerRef} : FiltersProps) {

    
    return (
        <div ref={stickyContainerRef} className="sticky -ml-5 -mr-5 top-[64px] -mt-[2rem] z-[100] flex gap-5 bg-white py-[18px] px-5">
          <Button ref={(el) => { buttonRefs.current['sort'] = el; }}
 onClick={() => openModal('sort')}
 variant={'outline'} className=" border-gray-400 rounded-full font-bold text-gray-600">
            SORT <ChevronDown className="ml-1" width={13} strokeWidth={3} />
          </Button>
          <Button ref={(el) => { buttonRefs.current['filter'] = el; }}
 onClick={() => openModal('filter')}
 variant={'outline'} className=" border-gray-400 rounded-full font-bold text-gray-600">
            SORT <ChevronDown className="ml-1" width={13} strokeWidth={3} />
          </Button>
        </div>
    )
}