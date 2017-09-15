import test from 'tape';

import MazeReducer from '../../src/Features/maze/maze.reducer';
import {
  INIT_MAZE,
  RESET_ACTIONERROR,
  RESET_PATHERROR,
  TOGGLE_HELP
} from "../../src/Features/maze/maze.action";

test('maze reducer should return current state if passed no valid action', assert => {
  const initialState = {};
  const action = {
    type: 'DUMMY_TEST'
  };

  assert.equal(MazeReducer(initialState, action), initialState);
  assert.end();
});

test('maze reducer should generate the correct initial state', assert => {
  const expectedState = {
    seed: null,
    maze: null,
    path: null,
    pathError: false,
    actionError: false,
    rotateMaze: false,
    tileSize: 30,
    displayHelp: false,
  };

  const action = {
    type: 'DUMMY_TEST'
  };

  assert.deepEqual(MazeReducer(undefined, action), expectedState);
  assert.end();
});

test('maze reducer should generate a new maze on INIT_MAZE action', assert => {
  const action = {
    type: INIT_MAZE,
    seed: 'a seed'
  };

  const state = MazeReducer(undefined, action);

  assert.ok(state.maze, 'maze should be initialized to not null');
  assert.ok(state.seed, 'seed should be initialized');
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