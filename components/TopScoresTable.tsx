import getTopScores from "@/actions/getTopScores";
import { useState, useEffect } from "react";
import { BarChart, Loader } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { userPlayType } from "@/types";
import Image from "next/image";
import type { linkCategoryType, CategoryToTableName } from "@/types";
import { usePathname } from "next/navigation";
import categoryImagesAndUrls from "@/categories";
import getAverageScore from "@/actions/getAverageScore";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type TopScoresTableProps = {
  category: linkCategoryType;
  numTrailers: number;
};

function formatDateString(dateString: string): string {
  const months: { [key: string]: number } = {
    Jan: 1,
    Feb: 2,
    Mar: 3,
    Apr: 4,
    May: 5,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sep: 9,
    Oct: 10,
    Nov: 11,
    Dec: 12,
  };
  const [dayOfWeek, month, day, year] = dateString.split(" ");
  const monthNumber = months[month];
  const shortYear = year.slice(2);

  // Format the date string as "M/D/YY"
  return `${monthNumber}/${day}/${shortYear}`;
}

export default function TopScoresTable({
  category,
  numTrailers,
}: TopScoresTableProps) {
  const [topScores, setTopScores] = useState<userPlayType[]>([]);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const name = categoryImagesAndUrls.find((obj) => obj.url === pathname)?.name;
  const [avgScores, setAvgScores] = useState<{
    avgCritic: number | null;
    avgAudience: number | null;
  }>({ avgCritic: null, avgAudience: null });

  useEffect(() => {
    async function getScores() {
      const { avgAudience, avgCritic } = await getAverageScore(
        pathname.replace("/play/", "") as keyof CategoryToTableName,
      );
      setAvgScores({ avgCritic, avgAudience });
      const data = await getTopScores(category, numTrailers);
      if (data) {
        setTopScores(data);
      }
      setLoading(false);
    }
    getScores();
  }, [category, numTrailers, pathname]);

  if (loading)
    return (
      <div className="flex items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    );

  return (
    <div className="flex flex-col mb-2 m-1 p-3 rounded-lg bg-green-500 border-0 border-b-2 border-l-2 border-green-300 text-card-foreground shadow-sm">
      <div className="relative flex items-center justify-center">
        <TableCaption className="text-2xl font-semibold flex flex-col gap-2 items-center leading-none text-black">
          <span>
            <BarChart className="inline mr-1 stroke-slate-100" />
            <span className=" text-slate-100">{`Top Scores for ${name}`}</span>
          </span>
          <div className="flex gap-5 text-sm">
            <div className="flex items-center">
              <Image
                className="inline mr-1"
                alt="critic"
                height={15}
                width={15}
                src={
                  avgScores.avgCritic !== null &&
                  avgScores.avgCritic !== undefined &&
                  avgScores.avgCritic >= 90
                    ? "https://www.rottentomatoes.com/assets/pizza-pie/images/icons/tomatometer/certified_fresh-notext.56a89734a59.svg"
                    : avgScores.avgCritic !== null &&
                        avgScores.avgCritic !== undefined &&
                        avgScores.avgCritic >= 60
                      ? "https://www.rottentomatoes.com/assets/pizza-pie/images/icons/tomatometer/tomatometer-fresh.149b5e8adc3.svg"
                      : "https://www.rottentomatoes.com/assets/pizza-pie/images/icons/tomatometer/tomatometer-rotten.f1ef4f02ce3.svg"
                }
              />
              <span className="text-slate-800">{`${avgScores.avgCritic}%`}</span>
            </div>
            <div className="flex items-center">
              <Image
                className="inline mr-1"
                alt="critic"
                height={15}
                width={15}
                src={
                  avgScores.avgCritic !== null &&
                  avgScores.avgCritic !== undefined &&
                  avgScores.avgCritic >= 60
                    ? "https://www.rottentomatoes.com/assets/pizza-pie/images/icons/audience/aud_score-fresh.6c24d79faaf.svg"
                    : "https://www.rottentomatoes.com/assets/pizza-pie/images/icons/audience/aud_score-rotten.f419e4046b7.svg"
                }
              />
              <span className="text-slate-800">{`${avgScores.avgAudience}%`}</span>
            </div>
          </div>
        </TableCaption>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead className="text-xs">Username</TableHead>
            <TableHead className="text-xs">Audience Score</TableHead>
            <TableHead className="text-xs">Critic Score</TableHead>
            <TableHead className="text-xs">Overall Score</TableHead>
            <TableHead className="text-xs">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {topScores.length > 0 ? (
            topScores.map((entry, ind) => (
              <TableRow key={uuidv4()}>
                <TableCell className="text-sm">{ind + 1}</TableCell>
                <TableCell className="text-sm">{entry.username}</TableCell>
                <TableCell className="text-sm">
                  {entry.audienceScore}%
                </TableCell>
                <TableCell className="text-sm">{entry.criticScore}%</TableCell>
                <TableCell className="text-sm">
                  <Image
                    alt="final"
                    height={15}
                    width={15}
                    className="relative bottom-[2px] mr-1 hidden sm:inline"
                    src={
                      entry.criticScore >= 90
                        ? "https://www.rottentomatoes.com/assets/pizza-pie/images/icons/tomatometer/certified_fresh-notext.56a89734a59.svg"
                        : entry.criticScore >= 60
                          ? "https://www.rottentomatoes.com/assets/pizza-pie/images/icons/tomatometer/tomatometer-fresh.149b5e8adc3.svg"
                          : "https://www.rottentomatoes.com/assets/pizza-pie/images/icons/tomatometer/tomatometer-rotten.f1ef4f02ce3.svg"
                    }
                  />
                  {entry.finalScore}%
                </TableCell>
                <TableCell className="text-sm">
                  {formatDateString(entry.time.toDateString())}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="text-sm" colSpan={4}>
                Be the first to play this mode!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
