import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { LucideArrowRight } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { guessType } from "@/types";
import UsernamePrompt from "./UsernamePrompt";

type UserInputsProps = {
  onGuess: (guessesObj: guessType) => void;
  isLastTrailer: boolean;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
};

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

export default function UserInputs({
  onGuess,
  isLastTrailer,
  username,
  setUsername,
}: UserInputsProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      criticGuess: undefined,
      audienceGuess: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onGuess(values);
    form.reset();
    form.setValue("criticGuess", "");
    form.setValue("audienceGuess", "");
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" sidebar w-72 flex-shrink-0 flex self-center lg:flex-col sm:gap-10 gap-5"
      >
        <FormField
          control={form.control}
          name="criticGuess"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex gap-1 items-center">
                <Image
                  src={`${field.value === "" ? "https://www.rottentomatoes.com/assets/pizza-pie/images/icons/tomatometer/tomatometer-empty.cd930dab34a.svg" : +field.value >= 90 ? "https://www.rottentomatoes.com/assets/pizza-pie/images/icons/tomatometer/certified_fresh-notext.56a89734a59.svg" : +field.value >= 60 ? "https://www.rottentomatoes.com/assets/pizza-pie/images/icons/tomatometer/tomatometer-fresh.149b5e8adc3.svg" : "https://www.rottentomatoes.com/assets/pizza-pie/images/icons/tomatometer/tomatometer-rotten.f1ef4f02ce3.svg"}`}
                  alt="critic"
                  height={20}
                  width={20}
                />
                <span>Critic</span>
              </FormLabel>
              <FormControl>
                <Input type="number" className="sm:w-[6.5rem]" {...field} />
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
              <FormLabel className="flex gap-1 items-center">
                <Image
                  src={`${field.value === "" ? "https://www.rottentomatoes.com/assets/pizza-pie/images/icons/audience/aud_score-empty.eb667b7a1c7.svg" : +field.value >= 60 ? "https://www.rottentomatoes.com/assets/pizza-pie/images/icons/audience/aud_score-fresh.6c24d79faaf.svg" : "https://www.rottentomatoes.com/assets/pizza-pie/images/icons/audience/aud_score-rotten.f419e4046b7.svg"}`}
                  alt="audience"
                  height={20}
                  width={20}
                />
                <span>Audience</span>
              </FormLabel>
              <FormControl>
                <Input type="number" className="sm:w-[6.5rem]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isLastTrailer &&
        form.getValues("criticGuess") !== undefined &&
        form.getValues("audienceGuess") !== undefined ? (
          <UsernamePrompt
            onGuess={onGuess}
            values={form.getValues()}
            username={username}
            setUsername={setUsername}
          />
        ) : (
          <Button
            type="submit"
            className="sm:w-[6.5rem] w-[5rem] self-end lg:self-start bg-red-600 hover:bg-white hover:text-black"
          >
            {isLastTrailer ? "Get Scores" : <LucideArrowRight />}
          </Button>
        )}
      </form>
    </Form>
  );
}
