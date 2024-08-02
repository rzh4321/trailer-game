"use client";
import Image from "next/image";
import TopScoresTable from "@/components/TopScoresTable";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { linkCategoryType } from "@/types";
import { useState, useEffect } from "react";
import * as background from "@/background";
import { v4 as uuidv4 } from "uuid";
import { Undo2 } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import { z } from "zod";

const categoryToBackgroundArr: { [key in linkCategoryType]: string[] } = {
  all: background.allPosters,
  action: background.actionPosters,
  adventure: background.adventurePosters,
  "highest-critic": background.highestCriticPosters,
  "lowest-critic": background.lowestCriticPosters,
  "highest-audience": background.highestAudiencePosters,
  "lowest-audience": background.lowestAudiencePosters,
  g: background.GPosters,
  controversial: background.controversialPosters,
  pg: background.PGPosters,
  "pg-13": background.PG13Posters,
  r: background.RPosters,
};

const formSchema = z.object({
  numTrailers: z.string(),
});

export default function Page({
  params,
}: {
  params: { category: linkCategoryType };
}) {
  const router = useRouter();

  useEffect(() => {
    // to prevent user from being able to scroll horizontally (due to background movie posters)
    document.body.classList.add("overflow-hidden");
    document
      .getElementById("container")
      ?.classList.add("h-full", "overflow-x-hidden");

    const preventDefault = (e: any) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    document.addEventListener("touchmove", preventDefault, { passive: false });

    return () => {
      // remove the class back when the component unmounts
      document.body.classList.remove("overflow-hidden");
      document
        .getElementById("container")
        ?.classList.remove("h-full", "overflow-x-hidden");

      document.removeEventListener("touchmove", preventDefault);
    };
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      numTrailers: "3",
    },
  });
  const [numTrailers, setNumTrailers] = useState(
    +form.getValues("numTrailers"),
  );

  function onSubmit(values: z.infer<typeof formSchema>) {
    const numTrailers = values.numTrailers;
    router.push(`/play/${params.category}/${numTrailers}`);
  }

  const posters = categoryToBackgroundArr[params.category as linkCategoryType];
  // duplicate posters for seamless transition when animation ends
  const duplicatedPosters = [...posters, ...posters];

  return (
    <>
      <div className="absolute sm:fixed inset-0 flex animate-slideToLeft">
        {duplicatedPosters.map((poster, index) => (
          <Image
            key={uuidv4()}
            priority={true}
            className="w-auto h-full object-fit"
            src={poster}
            alt="bg"
            width={524}
            height={524}
          />
        ))}
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center gap-10">
        <div className="-mb-4 self-start cursor-pointer bg-tomatoes hover:bg-red-500 rounded-lg p-1 flex gap-1 shadow-xl">
          <Undo2 className="stroke-white" />
          <span
            className="font-semibold text-white"
            onClick={() => router.back()}
          >
            Go Back
          </span>
        </div>
        <TopScoresTable category={params.category} numTrailers={numTrailers} />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card className="w-[350px]">
              <CardHeader>
                <CardTitle className="text-slate-100">
                  Select Number of Trailers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="numTrailers"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex justify-between">
                          <Select
                            onValueChange={(e) => {
                              field.onChange(e);
                              setNumTrailers(+e);
                            }}
                            defaultValue={"3"}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select number" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="1">1</SelectItem>
                                <SelectItem value="3">3</SelectItem>
                                <SelectItem value="5">5</SelectItem>
                                <SelectItem value="10">10</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <Button type="submit" variant={"spotify"}>
                            Start
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </form>
        </Form>
      </div>
    </>
  );
}
