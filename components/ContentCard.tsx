import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { categoryWithImageAndUrlType } from "@/types";

type ContentCardProps = {
  categoryObject: categoryWithImageAndUrlType;
};

const ContentCard = ({ categoryObject }: ContentCardProps) => {
  return (
    <Button
      className="relative border rounded-full hover:rounded-lg border-gray-300
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
  );
};

export default ContentCard;
