import { Character } from "@/types/game";

const SKIN_COLORS: Record<string, string> = {
  white: "hsl(30, 80%, 82%)",
  black: "hsl(25, 50%, 40%)",
  asian: "hsl(40, 70%, 75%)",
};

const HAIR_COLORS: Record<string, string> = {
  blonde: "hsl(45, 80%, 60%)",
  black: "hsl(0, 0%, 15%)",
  white: "hsl(0, 0%, 85%)",
  red: "hsl(10, 75%, 50%)",
  blue: "hsl(220, 75%, 55%)",
  green: "hsl(140, 60%, 45%)",
  none: "transparent",
};

interface CharacterCardProps {
  character: Character;
  isWrongGuess?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

export function CharacterCard({ character, isWrongGuess, onClick, disabled }: CharacterCardProps) {
  const skinColor = SKIN_COLORS[character.skinColor] || SKIN_COLORS.white;
  const hairColor = HAIR_COLORS[character.hairColor] || "transparent";
  const initials = character.name.slice(0, 2).toUpperCase();

  const isInactive = !character.active || disabled;

  return (
    <button
      onClick={onClick}
      disabled={isInactive}
      className={`relative w-[200px] h-[300px] rounded-xl border-2 border-border bg-card shadow-md
        transition-all duration-300 overflow-hidden flex flex-col items-center justify-center
        ${isInactive ? "opacity-40 cursor-not-allowed" : "hover:shadow-lg hover:scale-[1.02] hover:border-primary cursor-pointer"}
      `}
    >
      {/* Avatar circle */}
      <div
        className="w-24 h-24 rounded-full flex items-center justify-center text-2xl font-bold font-display shadow-inner border-2 border-border"
        style={{ backgroundColor: skinColor }}
      >
        {/* Hair indicator */}
        {character.hairType !== "bald" && (
          <div
            className="absolute top-8 w-20 h-6 rounded-t-full"
            style={{ backgroundColor: hairColor }}
          />
        )}
        <span className="relative z-10 text-foreground/80">{initials}</span>
      </div>

      {/* Character name */}
      <p className="mt-3 text-sm font-bold font-display text-card-foreground">{character.name}</p>

      {/* Trait pills */}
      <div className="mt-2 flex flex-wrap gap-1 justify-center px-2">
        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground">{character.sex}</span>
        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground">{character.hairType}</span>
        {character.glassesColor !== "none" && (
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground">👓</span>
        )}
        {character.beardType !== "none" && (
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground">🧔</span>
        )}
      </div>

      {/* Wrong guess overlay */}
      {isWrongGuess && (
        <div className="absolute inset-0 flex items-center justify-center bg-destructive/20 rounded-xl">
          <span className="text-6xl font-bold text-destructive">✕</span>
        </div>
      )}
    </button>
  );
}
