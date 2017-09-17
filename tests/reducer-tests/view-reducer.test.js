import test from 'tape';

import viewReducer, {initialState} from '../../src/store/reducers/view.reducer';
import { createStaticAction } from "../../src/utils/action-creator";
import { TOGGLE_HELP } from "../../src/store/action-constants";

test('view reducer should do nothing to the state if the action is not valid', assert => {
  const dummyAction = {
    type: 'dummy-action'
  };

  assert.deepEqual(viewReducer(initialState, dummyAction), initialState);
  assert.end();
});

test('view reducer should return the correct initial state if not passed a state', assert => {
  const dummyAction = {
    type: 'dummy-action'
  };

  assert.deepEqual(viewReducer(undefined, dummyAction), initialState);
  assert.end();
});

test('view reducer should correctly toggle help display', assert => {
  const action = createStaticAction(TOGGLE_HELP);
  const expectedState = {
    ...initialState,
    displayHelp: true
  };

  assert.deepEqual(viewReducer(undefined, action), expectedState);
  assert.end();
});
