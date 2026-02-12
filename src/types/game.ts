export interface Character {
  name: string;
  skinColor: string;
  hairType: string;
  hairColor: string;
  eyeColor: string;
  glassesColor: string;
  beardType: string;
  beardColor: string;
  mouth: string;
  sex: string;
  image: string;
  active: boolean;
}

export type TraitCategory =
  | "sex"
  | "skinColor"
  | "hairType"
  | "hairColor"
  | "eyeColor"
  | "glassesColor"
  | "beardType"
  | "beardColor"
  | "mouth";

export interface TraitGuess {
  category: TraitCategory;
  value: string;
  label: string;
  isCorrect: boolean;
}

export interface GameState {
  characters: Character[];
  mysteryCharacter: Character | null;
  confirmedTraits: TraitGuess[];
  wrongGuesses: number;
  maxGuesses: number;
  gameOver: boolean;
  won: boolean;
  totalTraitGuesses: number;
}

export interface GameService {
  initGame(characters: Character[]): GameState;
  guessTrait(state: GameState, category: TraitCategory, value: string): GameState;
  guessCharacter(state: GameState, characterName: string): GameState;
  resetGame(characters: Character[]): GameState;
}
