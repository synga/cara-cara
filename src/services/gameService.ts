import { Character, GameState, TraitCategory, GameService } from "@/types/game";

const TRAIT_LABELS: Record<TraitCategory, string> = {
  sex: "Sex",
  skinColor: "Skin Color",
  hairType: "Hair Type",
  hairColor: "Hair Color",
  eyeColor: "Eye Color",
  glassesColor: "Glasses",
  beardType: "Beard Type",
  beardColor: "Beard Color",
  mouth: "Mouth",
};

function formatTraitMessage(category: TraitCategory, value: string): string {
  const labels: Record<TraitCategory, (v: string) => string> = {
    sex: (v) => `The selected character is ${v === "male" ? "a man" : "a woman"}`,
    skinColor: (v) => `The selected character has ${v} skin`,
    hairType: (v) => `The selected character has ${v} hair`,
    hairColor: (v) => `The selected character has ${v} hair color`,
    eyeColor: (v) => `The selected character has ${v} eyes`,
    glassesColor: (v) => v === "none" ? "The selected character does not wear glasses" : `The selected character wears ${v} glasses`,
    beardType: (v) => v === "none" ? "The selected character has no beard" : `The selected character has a ${v} beard`,
    beardColor: (v) => v === "none" ? "The selected character has no beard color" : `The selected character has a ${v} colored beard`,
    mouth: (v) => `The selected character has a ${v} expression`,
  };
  return labels[category](value);
}

export const localGameService: GameService = {
  initGame(characters: Character[]): GameState {
    const allChars = characters.map((c) => ({ ...c, active: true }));
    const mystery = allChars[Math.floor(Math.random() * allChars.length)];
    return {
      characters: allChars,
      mysteryCharacter: mystery,
      confirmedTraits: [],
      wrongGuesses: 0,
      maxGuesses: 3,
      gameOver: false,
      won: false,
      totalTraitGuesses: 0,
    };
  },

  guessTrait(state: GameState, category: TraitCategory, value: string): GameState {
    if (state.gameOver || !state.mysteryCharacter) return state;

    const isMatch = state.mysteryCharacter[category] === value;
    const newTotalGuesses = state.totalTraitGuesses + 1;

    const updatedCharacters = state.characters.map((c) => {
      if (!c.active) return c;
      if (isMatch) {
        return { ...c, active: c[category] === value };
      } else {
        return { ...c, active: c[category] !== value };
      }
    });

    const label = formatTraitMessage(category, isMatch ? value : state.mysteryCharacter[category]);

    return {
      ...state,
      characters: updatedCharacters,
      confirmedTraits: [
        ...state.confirmedTraits,
        { category, value: state.mysteryCharacter[category], label },
      ],
      totalTraitGuesses: newTotalGuesses,
    };
  },

  guessCharacter(state: GameState, characterName: string): GameState {
    if (state.gameOver || !state.mysteryCharacter) return state;

    const isCorrect = state.mysteryCharacter.name === characterName;

    if (isCorrect) {
      return { ...state, gameOver: true, won: true };
    }

    const newWrongGuesses = state.wrongGuesses + 1;
    const updatedCharacters = state.characters.map((c) =>
      c.name === characterName ? { ...c, active: false } : c
    );

    return {
      ...state,
      characters: updatedCharacters,
      wrongGuesses: newWrongGuesses,
      gameOver: newWrongGuesses >= state.maxGuesses,
      won: false,
    };
  },

  resetGame(characters: Character[]): GameState {
    return this.initGame(characters);
  },
};

export { TRAIT_LABELS };
