import test from 'tape';

import { createMaze } from 'mazer-shared';
import stateReducer, { initialState } from '../../src/store/reducers/maze-state.reducer';
import { createStaticAction, createUpdateAction } from "../../src/utils/action-creator";
import {
  INIT_MAZE, RESET_ACTIONERROR, RESET_MAZE, RESET_PATHERROR, UPDATE_MAZE,
  UPDATE_VIEWPARAMS
} from "../../src/store/action-constants";

test('state reducer should return current state if passed no valid action', assert => {
  const testAction = {
    type: 'DUMMY_TEST'
  };

  assert.equal(stateReducer(initialState, testAction), initialState);
  assert.end();
});

test('state reducer should generate the correct initial state', assert => {
  const testAction = {
    type: 'DUMMY_TEST'
  };

  assert.deepEqual(stateReducer(undefined, testAction), initialState);
  assert.end();
});

test('state reducer should generate a new maze on INIT_MAZE action', assert => {
  const seed = 'test seed';
  const testAction = createUpdateAction(INIT_MAZE, seed);
  const state = stateReducer(undefined, testAction);

  assert.ok(state.maze, 'maze should be initialized');
  assert.ok(state.path, 'path should be initialized');
  assert.end();
});

test('state reducer should be able reset path error', assert => {
  const testAction = createStaticAction(RESET_PATHERROR);
  const initialState = {
    pathError: true
  };
  const expectedState = {
    pathError: false
  };

  assert.deepEqual(stateReducer(initialState, testAction), expectedState);
  assert.end();
});

test('state reducer should be able reset path error', assert => {
  const action = createStaticAction(RESET_ACTIONERROR);
  const initialState = {
    actionError: true
  };
  const expectedState = {
    actionError: false
  };

  assert.deepEqual(stateReducer(initialState, action), expectedState);
  assert.end();
});

test('state reducer should return a different state if given a click action', assert => {
  const seed = 'test seed';
  const testMaze = createMaze(seed);
  const initAction = createUpdateAction(INIT_MAZE, seed);
  const initialState = stateReducer(undefined, initAction);

  const testAction = createUpdateAction(UPDATE_MAZE, testMaze.mazeTiles[1][1]);

  assert.notDeepEqual(stateReducer(initialState, testAction), initialState);
  assert.end();
});

test('state reducer should be able to reset the maze', assert => {
  const seed = 'test seed';
  const initAction = createUpdateAction(INIT_MAZE, seed);
  const initialState = stateReducer(undefined, initAction);

  const testAction = createStaticAction(RESET_MAZE);

  assert.notDeepEqual(stateReducer(initialState, testAction), initialState);
  assert.end();
});

test('state reducer should be able to update view parameters', assert => {
  const seed = 'test seed';
  const testMaze = createMaze(seed);
  const LANDSCAPE = 'LANDSCAPE';
  const PORTRAIT = 'PORTRAIT';
  const mazeOrientation = testMaze.params.numColumns > testMaze.params.numRows ? LANDSCAPE : PORTRAIT;

  const viewHeight = 1080;
  const viewWidth = 1920;
  const viewOrientation = LANDSCAPE;

  const testAction = createUpdateAction(
      UPDATE_VIEWPARAMS,
      {height: viewHeight, width: viewWidth}
  );

  const state = {
    ...initialState,
    maze: testMaze
  };

  assert.deepEqual(stateReducer(state, testAction).tileSize, 30,
      'the screen is large enough that the tiles should be the maximum 30px');
  assert.deepEqual(stateReducer(state, testAction).rotateMaze,
      mazeOrientation !== viewOrientation,
      'rotateMaze should be true only if the maze orientation and screen orientation are different');
  assert.end();
});
