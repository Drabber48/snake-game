const fs = require('fs');
const path = 'snake.html';
let s = fs.readFileSync(path, 'utf8');
// Normalize line endings to \n for easier matching
const normalized = s.replace(/\r\n/g, '\n');

const reps = [
  [
    'let nextDirection = { x: 0, y: 0 };',
    'let inputQueue = [];'
  ],
  [
    '  direction = { x: 0, y: -1 };\n  nextDirection = { x: 0, y: -1 };',
    '  direction = { x: 0, y: -1 };\n  inputQueue.length = 0;'
  ],
  [
    'function step() {\n  direction = nextDirection;\n',
    'function step() {\n  // Process input queue: shift the oldest pending move (if any) into active direction\n  if (inputQueue.length > 0) {\n    direction = inputQueue.shift();\n  }\n'
  ],
  [
    "  if (gameState === 'playing') {\n    const k = e.key.toLowerCase();\n    if ((k === 'arrowup' || k === 'w') && direction.y === 0) { nextDirection = { x: 0, y: -1 }; sfx.move(); }\n    if ((k === 'arrowdown' || k === 's') && direction.y === 0) { nextDirection = { x: 0, y: 1 }; sfx.move(); }\n    if ((k === 'arrowleft' || k === 'a') && direction.x === 0) { nextDirection = { x: -1, y: 0 }; sfx.move(); }\n    if ((k === 'arrowright' || k === 'd') && direction.x === 0) { nextDirection = { x: 1, y: 0 }; sfx.move(); }\n  }",
    "  if (gameState === 'playing') {\n    const k = e.key.toLowerCase();\n    if (k === 'arrowup' || k === 'w')    tryQueueMove(0, -1);\n    if (k === 'arrowdown' || k === 's')  tryQueueMove(0, 1);\n    if (k === 'arrowleft' || k === 'a')  tryQueueMove(-1, 0);\n    if (k === 'arrowright' || k === 'd') tryQueueMove(1, 0);\n  }"
  ],
  [
    "      if (Math.abs(dx) > Math.abs(dy)) {\n        if (dx > 0 && direction.x === 0) { nextDirection = { x: 1, y: 0 }; sfx.move(); }\n        if (dx < 0 && direction.x === 0) { nextDirection = { x: -1, y: 0 }; sfx.move(); }\n      } else {\n        if (dy > 0 && direction.y === 0) { nextDirection = { x: 0, y: 1 }; sfx.move(); }\n        if (dy < 0 && direction.y === 0) { nextDirection = { x: 0, y: -1 }; sfx.move(); }\n      }",
    "      if (Math.abs(dx) > Math.abs(dy)) {\n        if (dx > 0) tryQueueMove(1, 0);\n        if (dx < 0) tryQueueMove(-1, 0);\n      } else {\n        if (dy > 0) tryQueueMove(0, 1);\n        if (dy < 0) tryQueueMove(0, -1);\n      }"
  ],
  [
    'let touchStartX = 0;\nlet touchStartY = 0;',
    "// Queue an intended move into inputQueue so rapid taps are not dropped.\n// Validates against the last queued move (or current direction if queue is empty)\n// to reject illegal 180-degree turns. Caps the queue length at 2.\nfunction tryQueueMove(x, y) {\n  const lastMove = inputQueue.length > 0 ? inputQueue[inputQueue.length - 1] : direction;\n  // Reject 180-degree reversal\n  if (lastMove.x + x === 0 && lastMove.y + y === 0) return;\n  // Cap the buffer so a frantic player cannot queue a long string of turns\n  if (inputQueue.length >= 2) return;\n  inputQueue.push({ x, y });\n  sfx.move();\n}\n\nlet touchStartX = 0;\nlet touchStartY = 0;"
  ]
];

const results = reps.map(r => normalized.includes(r[0]));
const allFound = results.every(x => x);
let newContent = normalized;
reps.forEach((r, i) => {
  if (results[i]) {
    newContent = newContent.split(r[0]).join(r[1]);
  }
});
// Convert back to \r\n for Windows line endings
const finalContent = newContent.replace(/\n/g, '\r\n');
fs.writeFileSync(path, finalContent, 'utf8');
console.log('replacements_found=' + results.map((f, i) => i + ':' + f).join(','));
console.log('all_found=' + allFound);
console.log('file_size_before=' + s.length);
console.log('file_size_after=' + finalContent.length);
