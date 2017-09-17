import test from 'tape';

import LeaderBoardReducer, {
  initialState
} from "../../src/reducers/leader-board.reducer";
import {
  FETCH_LEADERBOARD,
  FETCH_LEADERBOARD_ERROR,
  FETCH_LEADERBOARD_FULFILLED
} from "../../src/features/leaderboard/leader-board.action";

test('leaderboard reducer should default to the initial state', assert => {
  const dummyAction = {
    type: 'dummy'
  };

  assert.deepEqual(LeaderBoardReducer(undefined, dummyAction), initialState);
  assert.end();
});

test('leaderboard reducer should not touch the state if an invalid action is provided', assert => {
  const dummyAction = {
    type: 'dummy'
  };

  assert.deepEqual(LeaderBoardReducer(initialState, dummyAction), initialState);
  assert.end();
});

test('leaderboard reducer should be able to set pending state', assert => {
  const testAction = {
    type: FETCH_LEADERBOARD
  };

  const expectedState = {
    ...initialState,
    leaderBoardPending: true
  };

  assert.deepEqual(LeaderBoardReducer(undefined, testAction), expectedState);
  assert.end();
});

test('leaderboard reducer should be able to fulfil pending request', assert => {
  const scores = ['score 1', 'score 2'];
  const seed = 'test-seed';
  const testAction = {
    type: FETCH_LEADERBOARD_FULFILLED,
    scores,
    seed
  };

  const expectedState = {
    ...initialState,
    scores,
    seed,
    leaderBoardPending: false
  };

  assert.deepEqual(LeaderBoardReducer(undefined, testAction), expectedState);
  assert.end();
});

test('leaderboard reducer should be able to update error', assert => {
  const scores = [];
  const error = 'this is an error';
  const seed = 'test-seed';
  const testAction = {
    type: FETCH_LEADERBOARD_ERROR,
    scores,
    error
  };

  const expectedState = {
    ...initialState,
    scores,
    error,
    leaderBoardPending: false
  };

  assert.deepEqual(LeaderBoardReducer(undefined, testAction), expectedState);
  assert.end();
});