import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRef, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import type { guessType } from "@/types";

type UsernamePromptProps = {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  onGuess: (guessesObj: guessType) => void;
  values: { criticGuess: string; audienceGuess: string };
};

export default function UsernamePrompt({
  username,
  setUsername,
  onGuess,
  values,
}: UsernamePromptProps) {
  // register the last guesses to transition to results screen
  const handleSubmit = () => {
    onGuess(values);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          className="sm:w-[6.5rem] w-[5rem] self-end lg:self-start bg-red-600"
        >
          Get Scores
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex gap-1">
            Submit your score to the leaderboards
          </DialogTitle>
          <DialogDescription className="leading-relaxed">
            {
              "Enter a username. Leave it blank if you don't want to submit your score."
            }
          </DialogDescription>
        </DialogHeader>
        <div>
          <Input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <Button onClick={handleSubmit} variant={"spotify"}>
          Continue
        </Button>
      </DialogContent>
    </Dialog>
  );
}
