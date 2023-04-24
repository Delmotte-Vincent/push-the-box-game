const groundsTest = [
  { x: 3, y: 1 },
  { x: 4, y: 1 },
  { x: 5, y: 1 },
  { x: 3, y: 2 },
  { x: 5, y: 2 },
  { x: 1, y: 3 },
  { x: 2, y: 3 },
  { x: 3, y: 3 },
  { x: 4, y: 3 },
  { x: 5, y: 3 },
  { x: 1, y: 4 },
  { x: 2, y: 4 },
  { x: 3, y: 4 },
  { x: 4, y: 4 },
  { x: 2, y: 5 },
  { x: 3, y: 5 },
  { x: 2, y: 6 },
  { x: 3, y: 6 }
];

const boxesTest = [
  { x: 2, y: 3 },
  { x: 3, y: 3 }
];

const targetsTest = [
  { x: 4, y: 3 },
  { x: 2, y: 4 }
];

const playerInitialPosition = {
  x: 5,
  y: 3
};

const wallsTest = [
  { x: 2, y: 0 },
  { x: 3, y: 0 },
  { x: 4, y: 0 },
  { x: 5, y: 0 },
  { x: 6, y: 0 },
  { x: 2, y: 1 },
  { x: 6, y: 1 },
  { x: 0, y: 2 },
  { x: 1, y: 2 },
  { x: 2, y: 2 },
  { x: 4, y: 2 },
  { x: 6, y: 2 },
  { x: 0, y: 3 },
  { x: 6, y: 3 },
  { x: 0, y: 4 },
  { x: 5, y: 4 },
  { x: 6, y: 4 },
  { x: 0, y: 5 },
  { x: 1, y: 5 },
  { x: 4, y: 5 },
  { x: 5, y: 5 },
  { x: 1, y: 6 },
  { x: 5, y: 6 },
  { x: 1, y: 7 },
  { x: 2, y: 7 },
  { x: 3, y: 7 },
  { x: 4, y: 7 }
];

const GAME_TEST = {
  id: 1,
  initialPlayerPosition: playerInitialPosition,
  boxes: boxesTest,
  walls: wallsTest,
  targets: targetsTest,
  grounds: groundsTest,
  bordSize: 8
};

// ================
const BOARD_SIZE = 15;

const WALLS = [
  { x: 1, y: 4 },
  { x: 1, y: 5 },
  { x: 1, y: 6 },
  { x: 1, y: 7 }
];
const BOXES = [{ x: 4, y: 4 }];

const TARGETS = [{ x: 8, y: 8 }];

const INITIAL_PLAYER_POSITION = {
  x: 0,
  y: 0
};

const GAME_1 = {
  id: 2,
  initialPlayerPosition: INITIAL_PLAYER_POSITION,
  boxes: BOXES,
  walls: WALLS,
  targets: TARGETS,
  bordSize: BOARD_SIZE
};

const GAME_2 = {
  id: 3,
  initialPlayerPosition: INITIAL_PLAYER_POSITION,
  boxes: [
    { x: 4, y: 4 },
    { x: 5, y: 7 }
  ],
  walls: WALLS,
  targets: [
    { x: 8, y: 8 },
    { x: 1, y: 9 }
  ],
  bordSize: BOARD_SIZE
};

export const GAMES = [GAME_TEST, GAME_1, GAME_2];
