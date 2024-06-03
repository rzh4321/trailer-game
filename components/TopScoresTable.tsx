import getTopScores from "@/actions/getTopScores";
import { useState, useEffect } from "react";
import { BarChart, Loader } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { userPlayType } from "@/types";
import Image from "next/image";
import type { linkCategoryType } from "@/types";

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

  useEffect(() => {
    async function getScores() {
      const data = await getTopScores(category, numTrailers);
      if (data) {
        setTopScores(data);
      }
      setLoading(false);
    }
    getScores();
  }, [category, numTrailers]);

  if (loading)
    return (
      <div className="flex items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    );

  return (
    <div className="flex flex-col mb-2 rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="relative flex items-center justify-center">
        <TableCaption className="text-2xl font-semibold leading-none tracking-tight text-black">
          <BarChart className="inline mr-1" />
          {`Top Scores for ${numTrailers} Trailer${numTrailers > 1 ? "s" : ""}`}
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
                <TableCell className="text-xs">{ind + 1}</TableCell>
                <TableCell className="text-xs">{entry.username}</TableCell>
                <TableCell className="text-xs">
                  {entry.audienceScore}%
                </TableCell>
                <TableCell className="text-xs">{entry.criticScore}%</TableCell>
                <TableCell className="text-xs">
                  <Image
                    alt="final"
                    height={20}
                    width={20}
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
                <TableCell className="text-xs">
                  {formatDateString(entry.time.toDateString())}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="text-xs" colSpan={4}>
                Be the first to play this mode!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
