import { X } from "lucide-react";
import { Character } from "@/types/game";

interface MysteryCardProps {
  wrongGuesses: number;
  maxGuesses: number;
  mysteryCharacter?: Character | null;
  revealed?: boolean;
}

export function MysteryCard({ wrongGuesses, maxGuesses, mysteryCharacter, revealed }: MysteryCardProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      {/* Mystery card */}
      <div className="w-[140px] h-[200px] rounded-xl border-2 border-primary bg-primary/10 shadow-lg flex items-center justify-center">
        {revealed && mysteryCharacter ? (
          <div className="text-center">
            <p className="text-3xl font-bold font-display text-primary">
              {mysteryCharacter.name.slice(0, 2).toUpperCase()}
            </p>
            <p className="text-sm font-bold font-display text-primary mt-1">{mysteryCharacter.name}</p>
          </div>
        ) : (
          <div className="text-center">
            <span className="text-5xl">❓</span>
            <p className="text-xs font-bold text-primary mt-2 font-display">Mystery Character</p>
          </div>
        )}
      </div>

      {/* Wrong guesses indicator */}
      <div className="flex gap-2">
        {Array.from({ length: maxGuesses }).map((_, i) => (
          <div
            key={i}
            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all
              ${i < wrongGuesses
                ? "border-destructive bg-destructive/20"
                : "border-muted bg-muted/50"
              }`}
          >
            {i < wrongGuesses && <X className="w-4 h-4 text-destructive" />}
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground font-body">
        {maxGuesses - wrongGuesses} guess{maxGuesses - wrongGuesses !== 1 ? "es" : ""} remaining
      </p>
    </div>
  );
}
