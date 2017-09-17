import test from 'tape';

import dataReducer, { initialState } from "../../src/reducers/data.reducer";
import { FETCH_LEADERBOARD } from "../../src/features/leaderboard/leader-board.action";
import {
  createErrorAction, createStartAction, createSuccessAction,
  createUpdateAction
} from "../../src/Utils/action-creator";
import { FETCH_HIGHSCORE } from "../../src/features/maze/maze.action";

test('reducer should default to the initial state', assert => {
  const testAction = {
    type: 'dummy'
  };

  assert.deepEqual(dataReducer(undefined, testAction), initialState);
  assert.end();
});

test('reducer should not touch the state if an invalid action is provided', assert => {
  const testAction = {
    type: 'dummy'
  };

  assert.deepEqual(dataReducer(initialState, testAction), initialState);
  assert.end();
});

test('reducer should be able to set pending state', assert => {
  const testAction = createStartAction(FETCH_LEADERBOARD);

  const expectedState = {
    ...initialState,
    leaderBoardPending: true
  };

  assert.deepEqual(dataReducer(undefined, testAction), expectedState);
  assert.end();
});

test('reducer should be able to fulfil pending request', assert => {
  const scores = ['score 1', 'score 2'];
  const testAction = createSuccessAction(FETCH_LEADERBOARD, scores);

  const expectedState = {
    ...initialState,
    topTen: scores,
    leaderBoardPending: false
  };

  assert.deepEqual(dataReducer(undefined, testAction), expectedState);
  assert.end();
});

test('reducer should be able to update error', assert => {
  const error = 'this is an error';
  const testAction = createErrorAction(FETCH_LEADERBOARD, error);

  const expectedState = {
    ...initialState,
    leaderBoardError: error,
    leaderBoardPending: false
  };

  assert.deepEqual(dataReducer(undefined, testAction), expectedState);
  assert.end();
});

test('reducer should be able to update high score', assert => {
  const score = 9000;
  const testAction = createUpdateAction(FETCH_HIGHSCORE, score);
  const expectedState = {
      ...initialState,
    highScore: score
  };

  assert.deepEqual(dataReducer(undefined, testAction), expectedState);
  assert.end();
});