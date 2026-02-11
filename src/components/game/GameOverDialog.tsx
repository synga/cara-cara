import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Character } from "@/types/game";

interface GameOverDialogProps {
  open: boolean;
  won: boolean;
  mysteryCharacter: Character | null;
  onPlayAgain: () => void;
  onMainMenu: () => void;
}

export function GameOverDialog({ open, won, mysteryCharacter, onPlayAgain, onMainMenu }: GameOverDialogProps) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="rounded-xl text-center">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-display text-2xl">
            {won ? "🎉 Congratulations!" : "😔 Game Over"}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base">
            {won
              ? `You guessed correctly! The mystery character was ${mysteryCharacter?.name}.`
              : `You ran out of guesses. The mystery character was ${mysteryCharacter?.name}.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col sm:flex-row gap-2">
          <AlertDialogAction onClick={onPlayAgain} className="bg-primary">
            🔄 Play Again
          </AlertDialogAction>
          <AlertDialogAction onClick={onMainMenu} className="border border-primary text-primary bg-transparent hover:bg-primary/10">
            🏠 Main Menu
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
