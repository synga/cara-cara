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
      className={`relative w-[200px] min-h-[340px] rounded-xl border-2 border-border bg-card shadow-md
        transition-all duration-300 overflow-hidden flex flex-col items-center pt-4 pb-3
        ${isInactive ? "opacity-40 cursor-not-allowed" : "hover:shadow-lg hover:scale-[1.02] hover:border-primary cursor-pointer"}
      `}
    >
      {/* Character image */}
      <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-border shadow-inner bg-muted flex-shrink-0">
        {imageSrc ? (
          <img src={imageSrc} alt={character.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-2xl font-bold font-display text-foreground/80">
            {character.name.slice(0, 2).toUpperCase()}
          </div>
        )}
      </div>

      {/* Character name */}
      <p className="mt-2 text-sm font-bold font-display text-card-foreground">{character.name}</p>

      {/* All traits */}
      <div className="mt-2 flex flex-col gap-0.5 px-3 w-full text-left">
        {[
          { label: "Sex", value: character.sex },
          { label: "Skin", value: character.skinColor },
          { label: "Hair", value: `${character.hairColor} ${character.hairType}` },
          { label: "Eyes", value: character.eyeColor },
          { label: "Glasses", value: character.glassesColor },
          { label: "Beard", value: character.beardType === "none" ? "none" : `${character.beardColor} ${character.beardType}` },
          { label: "Mouth", value: character.mouth },
        ].map((t) => (
          <div key={t.label} className="flex justify-between text-[10px] leading-tight">
            <span className="font-semibold text-muted-foreground">{t.label}</span>
            <span className="text-card-foreground capitalize">{t.value}</span>
          </div>
        ))}
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
