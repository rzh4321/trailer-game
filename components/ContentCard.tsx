import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { categoryWithImageAndUrlType } from "@/types";

type ContentCardProps = {
  categoryObject: categoryWithImageAndUrlType;
};

const ContentCard = ({ categoryObject }: ContentCardProps) => {
  return (
    <div className="flex flex-col gap-1">
      <Button
      className="relative border rounded-full hover:rounded-full border-gray-300
        w-32 h-32 sm:w-48 sm:h-48 md:w-[300px] md:h-[200px] p-0
        lg:w-72 lg:h-72 xl:w-96 xl:h-96 cursor-pointer transition-transform duration-300 ease-out transform hover:scale-110"
    >
      <Link href={categoryObject.url ?? ''}>
        <Image
        className="object-fit rounded-xl"
          alt={categoryObject.name}
          src={categoryObject.image === undefined ? "" : categoryObject.image}
          fill
        />
        <div
          className={`absolute shadow-lg m-auto inset-x-0 text-center top-[45%] xl:text-3xl lg:text-2xl md:text-xl font-semibold`}
        >
          {categoryObject.name}
        </div>
      </Link>
    </Button>
    <div className="flex flex-col">
      <div className="flex gap-5">
        <div className="flex items-center">
          <Image
                    alt="critic"
                    height={20}
                    width={20}
                    src={
                      categoryObject.criticScore ?? 0 >= 90
                        ? "https://www.rottentomatoes.com/assets/pizza-pie/images/icons/tomatometer/certified_fresh-notext.56a89734a59.svg"
                        : categoryObject.criticScore ?? 0 >= 60
                          ? "https://www.rottentomatoes.com/assets/pizza-pie/images/icons/tomatometer/tomatometer-fresh.149b5e8adc3.svg"
                          : "https://www.rottentomatoes.com/assets/pizza-pie/images/icons/tomatometer/tomatometer-rotten.f1ef4f02ce3.svg"
                    }
            />
            <span className="font-semibold ml-[2px] font-lato">{Math.round(categoryObject.criticScore ?? 0)}%</span>
        </div>
        <div className="flex items-center"> 
          <Image
                alt="audience"
                height={20}
                width={20}
                src={
                  categoryObject.audienceScore ?? 0 >= 60
                  ? "https://www.rottentomatoes.com/assets/pizza-pie/images/icons/audience/aud_score-fresh.6c24d79faaf.svg"
                  : "https://www.rottentomatoes.com/assets/pizza-pie/images/icons/audience/aud_score-rotten.f419e4046b7.svg"
                }
              />
                      <span className="font-semibold ml-[2px] font-lato">{Math.round(categoryObject.audienceScore ?? 0)}%</span>


        </div>
      </div>
      <div className="font-lato">
        {categoryObject.name}
      </div>
    </div>



    </div>
  );
};

export default ContentCard;
