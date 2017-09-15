import test from 'tape';

import { createMaze } from 'mazer-shared';
import MazeReducer, { initialState } from '../../src/Features/maze/maze.reducer';
import {
  INIT_MAZE,
  RESET_ACTIONERROR,
  RESET_PATHERROR,
  TOGGLE_HELP, UPDATE_HIGHSCORE
} from "../../src/Features/maze/maze.action";
import { CLICK_TILE } from "../../src/Features/maze/maze-game-board/maze-tile.action";

test('maze reducer should return current state if passed no valid action', assert => {
  const action = {
    type: 'DUMMY_TEST'
  };

  assert.equal(MazeReducer(initialState, action), initialState);
  assert.end();
});

test('maze reducer should generate the correct initial state', assert => {
  const action = {
    type: 'DUMMY_TEST'
  };

  assert.deepEqual(MazeReducer(undefined, action), initialState);
  assert.end();
});

test('maze reducer should generate a new maze on INIT_MAZE action', assert => {
  const action = {
    type: INIT_MAZE,
    seed: 'a seed'
  };
  const state = MazeReducer(undefined, action);

  assert.ok(state.maze, 'maze should be initialized to not null');
  assert.ok(state.path, 'path should be initialized');
  assert.end();
});

test('maze reducer should toggle help', assert => {
  const action = {
    type: TOGGLE_HELP
  };
  const initialState = {
    displayHelp: false
  };
  const expectedState = {
    displayHelp: true
  };

  assert.deepEqual(MazeReducer(initialState, action), expectedState);
  assert.end();
});

test('maze reducer should be able reset path error', assert => {
  const action = {
    type: RESET_PATHERROR
  };
  const initialState = {
    pathError: true
  };
  const expectedState = {
    pathError: false
  };

  assert.deepEqual(MazeReducer(initialState,action), expectedState);
  assert.end();
});

test('maze reducer should be able reset path error', assert => {
  const action = {
    type: RESET_ACTIONERROR
  };
  const initialState = {
    actionError: true
  };
  const expectedState = {
    actionError: false
  };

  assert.deepEqual(MazeReducer(initialState,action), expectedState);
  assert.end();
});

test('maze reducer should return a different state if given a click action', assert => {
  const seed = 'test-seed';
  const testMaze = createMaze('seed');
  const initAction = {
    type: INIT_MAZE,
    seed
  };
  const initialState = MazeReducer(undefined, initAction);

  const testAction = {
    type: CLICK_TILE,
    tile: testMaze.mazeTiles[1][1]
  };

  assert.notDeepEqual(MazeReducer(initialState, testAction), initialState);
  assert.end();
});

test('maze reducer should be able to set the high score', assert => {
  const testAction = {
    type: UPDATE_HIGHSCORE,
    score: 9000
  };
  const expectedState = {
    ...initialState,
    highScore: 9000
  };

  assert.deepEqual(MazeReducer(initialState, testAction), expectedState);
  assert.end();
});