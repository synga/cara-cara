import { useState, useCallback } from "react";
import { Character, GameState, TraitCategory } from "@/types/game";
import { localGameService } from "@/services/gameService";

export function useGame(characters: Character[]) {
  const [gameState, setGameState] = useState<GameState>(() =>
    localGameService.initGame(characters)
  );

  const guessTrait = useCallback(
    (category: TraitCategory, value: string) => {
      setGameState((prev) => localGameService.guessTrait(prev, category, value));
    },
    []
  );

  const guessCharacter = useCallback((characterName: string) => {
    setGameState((prev) => localGameService.guessCharacter(prev, characterName));
  }, []);

  const resetGame = useCallback(() => {
    setGameState(localGameService.resetGame(characters));
  }, [characters]);

  return { gameState, guessTrait, guessCharacter, resetGame };
}
