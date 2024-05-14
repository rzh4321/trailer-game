import Image from "next/image";
import Link from "next/link";

type ContentCardProps = {
  categoryObject: {
    name: string;
    url: string;
    image: string;
  };
};

const ContentCard = ({ categoryObject }: ContentCardProps) => {
  return (
    <div
      className="flex relative items-center justify-center border border-gray-300
        w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 
        lg:w-72 lg:h-72 xl:w-96 xl:h-96 cursor-pointer transition-all duration-300 ease-out transform hover:scale-110 hover:ring-2 hover:ring-offset-2 hover:ring-offset-gray-800 hover:ring-white ho bg-gray-700"
    >
      <Link href={categoryObject.url}>
        <Image
          alt={categoryObject.name}
          src={categoryObject.image === null ? "" : categoryObject.image}
          fill
        />
        <div
          className={`absolute shadow-lg m-auto inset-x-0 text-center top-[45%] xl:text-3xl lg:text-2xl md:text-xl font-semibold`}
        >
          {categoryObject.name}
        </div>
      </Link>
    </div>
  );
};

export default ContentCard;
