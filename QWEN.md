# Snake Game - Project Overview

## Project Overview

A feature-rich **Snake game** built as a single-file HTML5 web application with extensive customization options, achievements, and daily challenges.

## File Structure

```
snake game/
└── snake.html    # Complete game (HTML + CSS + JavaScript)
```

## Technologies Used

- **HTML5 Canvas** - Game rendering
- **CSS3** - Styling with CSS variables, animations, responsive design
- **Vanilla JavaScript** - Game logic (no external dependencies)
- **Web Audio API** - Procedural sound effects
- **LocalStorage** - Persistent settings, high scores, and achievements
- **Google Fonts** - "Press Start 2P" for retro themes

## Running the Game

Open `snake.html` in any modern web browser:
- Double-click the file in File Explorer
- Or run: `start "" "snake.html"`

## Game Controls

| Input | Action |
|-------|--------|
| `Arrow Keys` / `WASD` | Move snake |
| `Space` | Start game |
| `R` | Restart (after game over/win) |
| `P` | Pause/Resume |
| Touch/Swipe | Mobile controls |

## Features

### Game Modes
- **Normal**: Classic Snake - eat apples, avoid walls/self
- **Ultra**: Eat all 397 apples to win

### Difficulty Levels (Unlockable)
- **Easy**: 160ms per frame (unlocked by default)
- **Medium**: 120ms per frame (unlock for 50 gems)
- **Hard**: 80ms per frame (unlock for 250 gems)

### Theme System (100+ themes)
- **Modern themes**: Neon, gradient, shadow effects
- **Retro themes**: Game Boy, Commodore 64, NES, Arcade cabinets, and more
- Theme preview with live color sampling
- Searchable theme library
- Gem economy - unlock themes by playing

### Theme Format

Themes are defined in the `THEMES` object with the following properties:

```javascript
themeName: {
  bgColor: '#050510',      // Main background color
  bgGradLight: '#1e1e2e',  // Lighter gradient color
  panelBg: 'rgba(5,5,16,0.85)', // UI panel background
  canvasBg: 'rgba(10,10,25,0.6)', // Game canvas background
  boardDraw: '#020617',    // Board/border color
  grid: 'rgba(255,255,255,0.03)', // Grid lines (with transparency)
  text: '#e2e8f0',         // Text color
  accent: '#22d3ee',       // Accent color for UI
  head: '#fff',            // Snake head color
  apple: '#ff3333',        // Apple/food color
  shadows: true,           // Enable shadow effects
  eyeColor: '#000'         // Snake eye color
}
```

**Color Format:**
- Hex: `#RRGGBB` (6-digit)
- RGBA: `rgba(R, G, B, alpha)` for transparency
- Grid lines: low alpha (0.03-0.15) for subtlety

### Gem System
- Earn gems based on difficulty: Easy (1), Medium (2), Hard (3)
- Unlock new themes for 10 gems each
- Unlock difficulties: Medium (50 gems), Hard (250 gems)
- Progress saved in localStorage

### Achievements (28 total)
- **Score Milestones**: 10, 25, 50, 75, 100, 150 points
- **Games Played**: 1, 10, 25, 50, 100, 500 games
- **Gem Collection**: 100, 500, 1000, 5000 total + 10000 at once
- **Theme Collector**: Unlock 10, 25, 50 themes
- **Difficulty**: Unlock Medium/Hard, score 50+ on Hard
- **Special**: Win Ultra, eat 500 apples, survive 5 min, score exactly 77, complete 10 dailies
- Persistent unlock tracking with toast notifications

### Daily Challenges
- **50 unique challenges** across multiple categories
- **3 random challenges** selected each day
- **Gem rewards**: 5-100 gems per challenge
- **Streak bonuses**: Login streak tracking (2, 3, 5, 7, 14 days)
- **Challenge types**: Score, games played, apples eaten, difficulty-specific, Ultra mode, gems, themes, special
- Auto-resets daily using system clock

### Code System
- Redeem codes for bonus gems
- Codes can only be used once per account
- Default code: `admin48` → 10,000 gems

### Audio
- Procedural sound effects (move, eat, win, die, achievement unlock)
- Master volume control
- Web Audio API with oscillator-based sounds

### Persistence (localStorage)
- Selected theme
- Volume level
- Game mode preference
- Difficulty preference
- High scores (per mode/difficulty)
- Unlocked themes
- Unlocked difficulties
- Used codes
- Gem count
- Achievements unlocked
- Stats (games played, max score, total gems, apples eaten, survival time, wins, etc.)
- Daily challenges progress and streaks

## Code Structure

### Key Sections
1. **Audio System** - `sfx` object with `playTone`, `move`, `eat`, `die`, `win`
2. **Themes** - `THEMES` object with 100+ theme definitions
3. **Achievements** - `ACHIEVEMENTS` object with 28 achievement definitions
4. **Daily Challenges** - `DAILY_CHALLENGES` array with 50 challenge definitions
5. **Game Setup** - Canvas, UI elements, constants
6. **Menu & Settings** - Screen management, theme selector, codes menu, achievements, daily challenges
7. **Core Logic** - `initGame`, `step`, `update`, `placeFood`
8. **Rendering** - `draw` function with canvas operations
9. **Game Loop** - `requestAnimationFrame` based
10. **Controls** - Keyboard and touch handlers
11. **Codes System** - `CODES` object with redeemable codes
12. **Stats Tracking** - Games played, apples eaten, survival time, wins, themes unlocked, etc.

### Key Constants
```javascript
const TILE = 20;           // Grid tile size
const GRID_SIZE = 20;      // 20x20 grid
const SPEEDS = { easy: 160, medium: 120, hard: 80 };
const DIFFICULTY_COSTS = { medium: 50, hard: 250 };
const THEME_COST = 10;
const GEM_REWARDS = { easy: 1, medium: 2, hard: 3 };
```

### State Variables
```javascript
let gameState = 'start';   // 'start', 'playing', 'paused', 'gameover', 'win'
let snake = [];            // Array of {x, y} segments
let foods = [];            // Array of apple objects
let direction = {...};     // Current movement direction
let score = 0;
let gems = 0;              // Currency for unlocking themes/difficulties
let unlockedDifficulties = ['easy'];  // Unlocked difficulties
let usedCodes = [];        // Already redeemed codes
let achievements = [];     // Unlocked achievement IDs
let stats = {...};         // Games played, max score, total gems, apples eaten, etc.
let dailyChallengeState = {...};  // Current daily challenges and progress
let loginStreak = 0;       // Consecutive day login streak
```

### Stats Tracked
```javascript
{
  gamesPlayed: 0,
  maxScore: 0,
  totalGems: 0,
  totalApplesEaten: 0,
  longestSurvivalTime: 0,  // in seconds
  gamesWon: 0,
  themesUnlocked: 0,
  dailyChallengesCompleted: 0,
  mediumUnlocked: false,
  hardUnlocked: false,
  hardMaxScore: 0,
  hasScoredExactly77: false
}
```

## Browser Compatibility

- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers (touch controls)

## Notes

- Single-file architecture - portable, no build process
- Canvas hidden on menu, visible only during gameplay
- Toast notifications for insufficient gems, code redemption, and achievement unlocks
- Daily challenges reset at midnight (using system clock)
- All progress persisted in localStorage
