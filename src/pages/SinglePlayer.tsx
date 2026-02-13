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
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";

const allCharacters = charactersData as Character[];

function shuffleAndPick(chars: Character[], count: number): Character[] {
  const shuffled = [...chars].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export default function SinglePlayer() {
  const navigate = useNavigate();
  const [characterCount, setCharacterCount] = useState<number | null>(null);
  const [gameCharacters, setGameCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [wrongGuessNames, setWrongGuessNames] = useState<Set<string>>(new Set());

  const startGame = (count: number) => {
    const picked = shuffleAndPick(allCharacters, count);
    setGameCharacters(picked);
    setCharacterCount(count);
  };

  if (characterCount === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <AlertDialog open>
          <AlertDialogContent className="max-w-sm">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-center font-display text-2xl">
                How many characters?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-center">
                Choose how many characters will be on the board.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-col sm:flex-row gap-2 sm:gap-2">
              <Button className="flex-1" variant="outline" onClick={() => startGame(20)}>20</Button>
              <Button className="flex-1" variant="outline" onClick={() => startGame(30)}>30</Button>
              <Button className="flex-1" onClick={() => startGame(40)}>40</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  }

  return <GameBoard
    characters={gameCharacters}
    navigate={navigate}
    onReset={() => setCharacterCount(null)}
    selectedCharacter={selectedCharacter}
    setSelectedCharacter={setSelectedCharacter}
    wrongGuessNames={wrongGuessNames}
    setWrongGuessNames={setWrongGuessNames}
  />;
}

function GameBoard({
  characters,
  navigate,
  onReset,
  selectedCharacter,
  setSelectedCharacter,
  wrongGuessNames,
  setWrongGuessNames,
}: {
  characters: Character[];
  navigate: (path: string) => void;
  onReset: () => void;
  selectedCharacter: Character | null;
  setSelectedCharacter: (c: Character | null) => void;
  wrongGuessNames: Set<string>;
  setWrongGuessNames: React.Dispatch<React.SetStateAction<Set<string>>>;
}) {
  const { gameState, guessTrait, guessCharacter, resetGame } = useGame(characters);

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
    onReset();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
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

      <div className="flex-1 flex flex-col items-center gap-4 p-4 overflow-hidden">
        <MysteryCard
          wrongGuesses={gameState.wrongGuesses}
          maxGuesses={gameState.maxGuesses}
          mysteryCharacter={gameState.mysteryCharacter}
          revealed={gameState.gameOver}
        />

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

        <div className="w-full border-t border-border pt-4 bg-card rounded-t-xl shadow-inner px-4">
          <h3 className="text-sm font-bold font-display text-foreground mb-2">🔍 Guess a Trait</h3>
          <TraitSelector
            onSelectTrait={guessTrait}
            confirmedTraits={gameState.confirmedTraits}
            totalTraitGuesses={gameState.totalTraitGuesses}
            disabled={gameState.gameOver}
          />

          {gameState.confirmedTraits.length > 0 && (
            <div className="mt-3 space-y-1 pb-3">
              <h4 className="text-xs font-bold font-display text-muted-foreground uppercase">Trait Guesses</h4>
              {gameState.confirmedTraits.map((trait, i) => (
                <p key={i} className={`text-sm font-semibold ${trait.isCorrect ? "text-game-success" : "text-destructive"}`}>
                  {trait.isCorrect ? "✓" : "✗"} {trait.label}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>

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
