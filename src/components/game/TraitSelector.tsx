import { TraitCategory, TraitGuess } from "@/types/game";
import { Button } from "@/components/ui/button";
import { TRAIT_LABELS } from "@/services/gameService";
import { Lock } from "lucide-react";

interface TraitOption {
  category: TraitCategory;
  values: string[];
}

const TRAIT_OPTIONS: TraitOption[] = [
  { category: "sex", values: ["male", "female"] },
  { category: "skinColor", values: ["white", "black", "asian"] },
  { category: "hairType", values: ["long", "short", "mohawk", "bald"] },
  { category: "hairColor", values: ["blonde", "black", "white", "red", "blue", "green"] },
  { category: "eyeColor", values: ["blue", "green", "black", "brown"] },
  { category: "glassesColor", values: ["white", "black", "red", "blue", "none"] },
  { category: "beardType", values: ["full", "moustache", "goatee", "none"] },
  { category: "beardColor", values: ["blonde", "black", "white", "red", "blue", "green", "none"] },
  { category: "mouth", values: ["smiling", "serious", "frowning"] },
];

const LOCKED_CATEGORIES: TraitCategory[] = ["sex", "skinColor"];

interface TraitSelectorProps {
  onSelectTrait: (category: TraitCategory, value: string) => void;
  confirmedTraits: TraitGuess[];
  totalTraitGuesses: number;
  disabled?: boolean;
}

export function TraitSelector({ onSelectTrait, confirmedTraits, totalTraitGuesses, disabled }: TraitSelectorProps) {
  const usedCategories = confirmedTraits.map((t) => t.category);
  const isLocked = (cat: TraitCategory) => LOCKED_CATEGORIES.includes(cat) && totalTraitGuesses < 2;

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-4 min-w-max p-2">
        {TRAIT_OPTIONS.map((trait) => {
          const alreadyUsed = usedCategories.includes(trait.category);
          const locked = isLocked(trait.category);

          return (
            <div key={trait.category} className="flex flex-col gap-1.5 min-w-[100px]">
              <div className="flex items-center gap-1">
                <h4 className="text-xs font-bold font-display text-foreground uppercase tracking-wide">
                  {TRAIT_LABELS[trait.category]}
                </h4>
                {locked && <Lock className="w-3 h-3 text-muted-foreground" />}
              </div>
              {trait.values.map((value) => (
                <Button
                  key={value}
                  size="sm"
                  variant={alreadyUsed ? "secondary" : "outline"}
                  disabled={disabled || alreadyUsed || locked}
                  onClick={() => onSelectTrait(trait.category, value)}
                  className="text-xs capitalize h-7 justify-start"
                >
                  {value}
                </Button>
              ))}
              {locked && (
                <p className="text-[10px] text-muted-foreground italic">
                  Unlocks after 2 guesses
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
