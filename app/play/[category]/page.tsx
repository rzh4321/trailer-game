"use client";
import Image from "next/image";
import TopScoresTable from "@/components/TopScoresTable";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { linkCategoryType } from "@/types";
import { useState } from "react";
import * as background from "@/background";
import { v4 as uuidv4 } from "uuid";

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
      <div className="absolute sm:fixed inset-0 h-screen flex animate-slideToLeft">
        {duplicatedPosters.map((poster, index) => (
          <Image
            key={uuidv4()}
            priority={true}
            className="w-auto h-auto"
            src={poster}
            alt="bg"
            width={524}
            height={524}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center gap-10">
        <TopScoresTable category={params.category} numTrailers={numTrailers} />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card className="w-[350px]">
              <CardHeader>
                <CardTitle>Select Number of Trailers</CardTitle>
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
