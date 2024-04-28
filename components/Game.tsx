import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { guessType } from "@/types";

const formSchema = z.object({
  criticGuess: z
    .string()
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Enter a number",
    })
    .refine((val) => +val >= 0, {
      message: "Critic score cannot be less than 0%",
    })
    .refine((val) => +val <= 100, {
      message: "Critic score cannot be greater than 100%",
    }),
  audienceGuess: z
    .string()
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Enter a number",
    })
    .refine((val) => +val >= 0, {
      message: "Audience score cannot be less than 0%",
    })
    .refine((val) => +val <= 100, {
      message: "Audience score cannot be greater than 100%",
    }),
});

type GameProps = {
  onGuess: (guessesObj: guessType) => void;
  videoId: string;
  movieName: string;
};

export default function Game({ onGuess, videoId, movieName }: GameProps) {
  // console.log(`https://www.youtube.com/embed/${videoId}`)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      criticGuess: undefined,
      audienceGuess: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    onGuess(values);
  }
  return (
    <div className="flex justify-between items-start max-w-6xl mx-auto gap-20 p-5">
      <div className="video-wrapper flex-grow pr-5 relative pt-[56.25%]">
        {/* <h1>{obj.movieName} - critic: {obj.criticScore}, audience: {obj.audienceScore}</h1> */}
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={movieName}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 sidebar w-72 flex-shrink-0 flex self-center flex-col gap-10"
        >
          <FormField
            control={form.control}
            name="criticGuess"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Critic Score:</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="audienceGuess"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Audience Score:</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
