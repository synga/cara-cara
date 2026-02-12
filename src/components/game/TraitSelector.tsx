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
  const isLocked = (cat: TraitCategory) => LOCKED_CATEGORIES.includes(cat) && totalTraitGuesses < 2;

  // Build a set of used trait values and check if a category was correctly guessed
  const usedTraitKeys = new Set(confirmedTraits.map((t) => `${t.category}:${t.value}`));
  const correctCategories = new Set(
    confirmedTraits.filter((t) => t.isCorrect).map((t) => t.category)
  );

  const isValueDisabled = (category: TraitCategory, value: string) => {
    // If the correct value was found for this category, disable all values
    if (correctCategories.has(category)) return true;
    // If this specific value was already guessed (wrong), disable it
    if (usedTraitKeys.has(`${category}:${value}`)) return true;
    return false;
  };

  const getValueVariant = (category: TraitCategory, value: string) => {
    const key = `${category}:${value}`;
    const trait = confirmedTraits.find((t) => t.category === category && t.value === value);
    if (trait) {
      return trait.isCorrect ? "default" : "secondary";
    }
    if (correctCategories.has(category)) return "secondary";
    return "outline";
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-4 min-w-max p-2">
        {TRAIT_OPTIONS.map((trait) => {
          const locked = isLocked(trait.category);

          return (
            <div key={trait.category} className="flex flex-col gap-1.5 min-w-[100px]">
              <div className="flex items-center gap-1">
                <h4 className="text-xs font-bold font-display text-foreground uppercase tracking-wide">
                  {TRAIT_LABELS[trait.category]}
                </h4>
                {locked && <Lock className="w-3 h-3 text-muted-foreground" />}
              </div>
              {trait.values.map((value) => {
                const valueDisabled = isValueDisabled(trait.category, value);
                return (
                  <Button
                    key={value}
                    size="sm"
                    variant={getValueVariant(trait.category, value)}
                    disabled={disabled || valueDisabled || locked}
                    onClick={() => onSelectTrait(trait.category, value)}
                    className="text-xs capitalize h-7 justify-start"
                  >
                    {value}
                  </Button>
                );
              })}
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
