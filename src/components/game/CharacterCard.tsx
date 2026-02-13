import { Character } from "@/types/game";
import characterImages from "@/assets/characterImages";

interface CharacterCardProps {
  character: Character;
  isWrongGuess?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

export function CharacterCard({ character, isWrongGuess, onClick, disabled }: CharacterCardProps) {
  const isInactive = !character.active || disabled;
  const imageSrc = characterImages[character.name];

  return (
    <button
      onClick={onClick}
      disabled={isInactive}
      className={`relative w-[220px] min-h-[380px] rounded-xl border-2 border-border bg-card shadow-md
        transition-all duration-300 overflow-hidden flex flex-col items-center pt-4 pb-3
        ${isInactive ? "opacity-40 cursor-not-allowed" : "hover:shadow-lg hover:scale-[1.02] hover:border-primary cursor-pointer"}
      `}
    >
      {/* Character image */}
      <div className="w-36 h-36 rounded-full overflow-hidden border-3 border-border shadow-inner bg-muted flex-shrink-0">
        {imageSrc ? (
          <img src={imageSrc} alt={character.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-3xl font-bold font-display text-foreground/80">
            {character.name.slice(0, 2).toUpperCase()}
          </div>
        )}
      </div>

      {/* Character name */}
      <p className="mt-2 text-base font-bold font-display text-card-foreground">{character.name}</p>

      {/* Trait pills */}
      <div className="mt-2 flex flex-wrap gap-1 justify-center px-2">
        <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-semibold capitalize">{character.sex}</span>
        <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-semibold capitalize">{character.skinColor}</span>
        <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-semibold capitalize">{character.hairColor} {character.hairType}</span>
        <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-semibold capitalize">{character.eyeColor} eyes</span>
        {character.glassesColor !== "none" && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-semibold capitalize">👓 {character.glassesColor}</span>
        )}
        {character.beardType !== "none" && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-semibold capitalize">🧔 {character.beardColor} {character.beardType}</span>
        )}
        <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-semibold capitalize">{character.mouth}</span>
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
