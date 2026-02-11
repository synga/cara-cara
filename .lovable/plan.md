

# 🎯 Guess Who? — Educational Edition

## Overview
A playful, colorful "Guess Who?" game built in React. Single-player mode against the computer, with code abstracted via a game service layer to allow future Firebase integration.

---

## 1. Character Data (JSON in `/src/assets/characters.json`)
- 40 characters following the provided interface
- Diverse mix of traits (skin color, hair, eyes, glasses, beard, mouth, sex)
- Realistic combinations (e.g., female characters won't have beards)
- Colored placeholder avatars with initials (no external images needed)

---

## 2. Main Menu — Game Mode Selection Screen
- Bright, inviting landing page with the game title
- 3 game mode cards displayed:
  - **Mode 1: Single Player** (playable now)
  - **Mode 2**: Coming Soon (grayed out)
  - **Mode 3**: Coming Soon (grayed out)
- Clear labels and descriptions for each mode

---

## 3. Single Player Game Board
### Layout
- **Top section**: Mystery character shown as a back-faced card, plus Restart and Main Menu buttons
- **Middle section**: Scrollable flex grid of 40 character cards (200×300px each), responsive layout
- **Bottom section**: Trait guessing buttons + confirmed traits list

### Character Cards
- Each card shows the character's placeholder avatar, name, and is clickable
- When eliminated: reduced opacity + disabled interaction
- When incorrectly guessed: red "X" overlay + disabled

### Guessing Traits (Button Columns)
- Organized in labeled columns: Sex, Skin Color, Hair Type, Hair Color, Eye Color, Glasses, Beard Type, Beard Color, Mouth
- **Sex and Skin buttons are locked for the first 2 guesses** to prevent early game-ending
- Selecting a trait filters out non-matching characters (opacity fade) and adds a clear message below: *"The selected character is a woman"*
- Already-selected traits are visually marked as used

### Guessing a Character (3 Chances)
- Click a character card to guess — confirmation dialog before submitting
- **Correct guess**: Success alert with "Play Again" and "Main Menu" buttons
- **Wrong guess**: Card gets red X overlay, remaining guesses indicator updates
- **3 wrong guesses**: Game over alert revealing the correct character, with "Play Again" and "Main Menu" buttons

### Wrong Guesses Indicator
- Visual display (e.g., 3 X marks) shown near the mystery card, filling in red as guesses are used

---

## 4. Architecture — Abstracted for Future Online Play
- **Game Service Layer**: All game logic (select character, check trait, guess, reset) lives in an abstracted service module with a clean interface
- **React State Management**: Game state managed via React context/hooks consuming the service layer
- **Character Data Module**: Loaded from JSON, easily swappable with a Firebase fetch
- **Event-driven design**: Actions like "guess", "filter", "reset" go through the service — making it straightforward to replace with Firebase real-time calls later

---

## 5. Visual Design
- Playful color palette with bright accents (yellows, blues, greens, reds)
- Rounded corners, subtle shadows, friendly typography
- Clear instructional text throughout (educational focus)
- Smooth transitions when cards are eliminated
- Accessible design with good contrast and readable text for all ages

