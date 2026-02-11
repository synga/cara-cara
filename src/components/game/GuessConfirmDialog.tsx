import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Character } from "@/types/game";

interface GuessConfirmDialogProps {
  open: boolean;
  character: Character | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export function GuessConfirmDialog({ open, character, onConfirm, onCancel }: GuessConfirmDialogProps) {
  if (!character) return null;

  return (
    <AlertDialog open={open} onOpenChange={(o) => !o && onCancel()}>
      <AlertDialogContent className="rounded-xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-display text-xl">
            Are you sure you want to guess {character.name}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This will use one of your guesses. Choose carefully!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Yes, guess {character.name}!</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
