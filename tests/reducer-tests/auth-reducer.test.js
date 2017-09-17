import test from 'tape';

import AuthReducer, { initialState } from "../../src/reducers/auth.reducer";
import { AUTH_ERROR, AUTH_SET_PROFILE } from "../../src/features/auth/auth.action";

test('auth reducer should do nothing to the state if the action is not valid', assert => {
  const dummyAction = {
    type: 'dummy-action'
  };

  assert.deepEqual(AuthReducer(initialState, dummyAction), initialState);
  assert.end();
});

test('auth reducer should return the correct initial state if not passed a state', assert => {
  const dummyAction = {
    type: 'dummy-action'
  };

  assert.deepEqual(AuthReducer(undefined, dummyAction), initialState);
  assert.end();
});

test('auth reducer should be able to set a profile', assert => {
  const testAction = {
    type: AUTH_SET_PROFILE,
    user: 'a user object',
    token: 'a token object'
  };

  const expectedState = {
    ...initialState,
    token: testAction.token,
    user: testAction.user
  };

  assert.deepEqual(AuthReducer(undefined, testAction), expectedState);
  assert.end();
});

test('auth reducer should be able to set error state', assert => {
  const testAction = {
    type: AUTH_ERROR,
    error: 'this is an error'
  };

  const expectedState = {
      ...initialState,
    error: testAction.error
  };

  assert.deepEqual(AuthReducer(undefined, testAction), expectedState);
  assert.end();
});