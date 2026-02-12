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
      className={`relative w-[200px] h-[300px] rounded-xl border-2 border-border bg-card shadow-md
        transition-all duration-300 overflow-hidden flex flex-col items-center justify-center
        ${isInactive ? "opacity-40 cursor-not-allowed" : "hover:shadow-lg hover:scale-[1.02] hover:border-primary cursor-pointer"}
      `}
    >
      {/* Character image */}
      <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-border shadow-inner bg-muted">
        {imageSrc ? (
          <img src={imageSrc} alt={character.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-2xl font-bold font-display text-foreground/80">
            {character.name.slice(0, 2).toUpperCase()}
          </div>
        )}
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
