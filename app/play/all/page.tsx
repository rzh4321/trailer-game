"use client";
import Image from "next/image";
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

import { useRouter } from "next/navigation";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";

const formSchema = z.object({
  numTrailers: z.string(),
});

export default function Page() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      numTrailers: "3",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const numTrailers = values.numTrailers;
    router.push(`/play/all/${numTrailers}`);
  }

  const posters = [
    "https://static1.colliderimages.com/wordpress/wp-content/uploads/2023/11/apocalypse-now-1979-poster.jpg?q=50&fit=crop&w=750&dpr=1.5",
    "https://static1.colliderimages.com/wordpress/wp-content/uploads/2023/11/the-silence-of-the-lambs-1991-poster.jpg",
    "https://www.washingtonpost.com/graphics/2019/entertainment/oscar-nominees-movie-poster-design/img/black-panther-web.jpg",
    "https://static1.colliderimages.com/wordpress/wp-content/uploads/2023/11/jaws-1975-poster.jpg?q=50&fit=crop&w=750&dpr=1.5",
    "https://static1.colliderimages.com/wordpress/wp-content/uploads/2023/11/badlands-1973-poster.jpg?q=50&fit=crop&w=750&dpr=1.5",
    "https://static1.colliderimages.com/wordpress/wp-content/uploads/2023/11/scarface-1983-poster.jpg?q=50&fit=crop&w=750&dpr=1.5",
    "https://static1.colliderimages.com/wordpress/wp-content/uploads/2023/11/king-kong-1933-poster.jpg?q=50&fit=crop&w=750&dpr=1.5",
    "https://static1.colliderimages.com/wordpress/wp-content/uploads/2023/11/la-dolce-vita-1960-poster.jpg?q=50&fit=crop&w=750&dpr=1.5",
    "https://static1.colliderimages.com/wordpress/wp-content/uploads/2023/11/pulp-fiction-1994-poster.jpg?q=50&fit=crop&w=750&dpr=1.5",
    "https://static1.colliderimages.com/wordpress/wp-content/uploads/2023/11/breakfast-at-tiffany-s-1961-poster.jpg?q=50&fit=crop&w=750&dpr=1.5",
    "https://static1.colliderimages.com/wordpress/wp-content/uploads/2023/11/2001_-a-space-odyssey-1968-poster.jpg?q=50&fit=crop&w=750&dpr=1.5",
    "https://static1.colliderimages.com/wordpress/wp-content/uploads/2023/11/rocky-1976-poster.jpg?q=50&fit=crop&w=750&dpr=1.5",
    "https://static1.colliderimages.com/wordpress/wp-content/uploads/2023/11/the-thing-1982-poster.jpg?q=50&fit=crop&w=750&dpr=1.5",
    "https://static1.colliderimages.com/wordpress/wp-content/uploads/2023/11/sullivan-s-travels-1941-poster.jpg?q=50&fit=crop&w=750&dpr=1.5",
    "https://static1.colliderimages.com/wordpress/wp-content/uploads/2023/11/halloween-1978-poster.jpg?q=50&fit=crop&w=750&dpr=1.5",
  ];
  // duplicate posters for seamless transition when animation ends
  const duplicatedPosters = [...posters, ...posters];

  return (
    <>
      <div className="fixed inset-0 h-screen flex animate-slideToLeft z-0">
        {duplicatedPosters.map((poster, index) => (
          <Image
            key={index}
            className="relative w-[524px] z-0 h-screen min-w-[524px]"
            src={poster}
            alt="bg"
            width={200}
            height={200}
          />
        ))}
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center">
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
                            onValueChange={field.onChange}
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
                          <Button type="submit" variant={"blue"}>
                            Start
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              {/* <CardFooter className="flex justify-between">
                <Button type='submit' variant={'blue'}>Start</Button>
            </CardFooter> */}
            </Card>
          </form>
        </Form>
      </div>
    </>
  );
}
