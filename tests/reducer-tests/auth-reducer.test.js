import test from 'tape';

import authReducer, { initialState } from "../../src/store/reducers/auth.reducer";
import { createUpdateAction } from "../../src/Utils/action-creator";
import { AUTH_ERROR, SET_PROFILE } from "../../src/store/action-constants";

test('auth reducer should do nothing to the state if the action is not valid', assert => {
  const dummyAction = {
    type: 'dummy-action'
  };

  assert.deepEqual(authReducer(initialState, dummyAction), initialState);
  assert.end();
});

test('auth reducer should return the correct initial state if not passed a state', assert => {
  const dummyAction = {
    type: 'dummy-action'
  };

  assert.deepEqual(authReducer(undefined, dummyAction), initialState);
  assert.end();
});

test('auth reducer should be able to set a profile', assert => {
  const user = 'a user object';
  const token = 'a token object';
  const testAction = createUpdateAction(
      SET_PROFILE,
      {user, token}
  );

  const expectedState = {
    ...initialState,
    token,
    user
  };

  assert.deepEqual(authReducer(undefined, testAction), expectedState);
  assert.end();
});

test('auth reducer should be able to set error state', assert => {
  const testAction = {
    type: AUTH_ERROR,
    payload: 'an error object'
  };

  const expectedState = {
    ...initialState,
    authError: testAction.payload
  };

  assert.deepEqual(authReducer(undefined, testAction), expectedState);
  assert.end();
});