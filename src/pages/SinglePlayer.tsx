import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CharacterCard } from "@/components/game/CharacterCard";
import { MysteryCard } from "@/components/game/MysteryCard";
import { TraitSelector } from "@/components/game/TraitSelector";
import { GuessConfirmDialog } from "@/components/game/GuessConfirmDialog";
import { GameOverDialog } from "@/components/game/GameOverDialog";
import { useGame } from "@/hooks/useGame";
import { Character } from "@/types/game";
import charactersData from "@/assets/characters.json";
import { RotateCcw, Home } from "lucide-react";

const characters = charactersData as Character[];

export default function SinglePlayer() {
  const navigate = useNavigate();
  const { gameState, guessTrait, guessCharacter, resetGame } = useGame(characters);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [wrongGuessNames, setWrongGuessNames] = useState<Set<string>>(new Set());

  const handleCardClick = (character: Character) => {
    if (gameState.gameOver || !character.active) return;
    setSelectedCharacter(character);
  };

  const handleConfirmGuess = () => {
    if (!selectedCharacter) return;
    const isCorrect = gameState.mysteryCharacter?.name === selectedCharacter.name;
    if (!isCorrect) {
      setWrongGuessNames((prev) => new Set(prev).add(selectedCharacter.name));
    }
    guessCharacter(selectedCharacter.name);
    setSelectedCharacter(null);
  };

  const handleReset = () => {
    setWrongGuessNames(new Set());
    resetGame();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-card shadow-sm">
        <h1 className="text-2xl font-bold font-display text-primary">Guess Who?</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RotateCcw className="w-4 h-4 mr-1" /> Restart
          </Button>
          <Button variant="outline" size="sm" onClick={() => navigate("/")}>
            <Home className="w-4 h-4 mr-1" /> Menu
          </Button>
        </div>
      </header>

      {/* Mystery card + board */}
      <div className="flex-1 flex flex-col items-center gap-4 p-4 overflow-hidden">
        {/* Mystery card */}
        <MysteryCard
          wrongGuesses={gameState.wrongGuesses}
          maxGuesses={gameState.maxGuesses}
          mysteryCharacter={gameState.mysteryCharacter}
          revealed={gameState.gameOver}
        />

        {/* Character grid */}
        <ScrollArea className="flex-1 w-full">
          <div className="flex flex-wrap gap-3 justify-center pb-4">
            {gameState.characters.map((char) => (
              <CharacterCard
                key={char.name}
                character={char}
                isWrongGuess={wrongGuessNames.has(char.name)}
                onClick={() => handleCardClick(char)}
                disabled={gameState.gameOver}
              />
            ))}
          </div>
        </ScrollArea>

        {/* Trait selector */}
        <div className="w-full border-t border-border pt-4 bg-card rounded-t-xl shadow-inner px-4">
          <h3 className="text-sm font-bold font-display text-foreground mb-2">🔍 Guess a Trait</h3>
          <TraitSelector
            onSelectTrait={guessTrait}
            confirmedTraits={gameState.confirmedTraits}
            totalTraitGuesses={gameState.totalTraitGuesses}
            disabled={gameState.gameOver}
          />

          {/* Confirmed traits list */}
          {gameState.confirmedTraits.length > 0 && (
            <div className="mt-3 space-y-1 pb-3">
              <h4 className="text-xs font-bold font-display text-muted-foreground uppercase">Confirmed Traits</h4>
              {gameState.confirmedTraits.map((trait, i) => (
                <p key={i} className="text-sm text-game-success font-semibold">
                  ✓ {trait.label}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Dialogs */}
      <GuessConfirmDialog
        open={!!selectedCharacter}
        character={selectedCharacter}
        onConfirm={handleConfirmGuess}
        onCancel={() => setSelectedCharacter(null)}
      />
      <GameOverDialog
        open={gameState.gameOver}
        won={gameState.won}
        mysteryCharacter={gameState.mysteryCharacter}
        onPlayAgain={handleReset}
        onMainMenu={() => navigate("/")}
      />
    </div>
  );
}
