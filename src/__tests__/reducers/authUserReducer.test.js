/* eslint-disable no-undef */

import authUserReducer from '../../states/authUser/reducer';
import { ActionType } from '../../states/authUser/action';

describe('authUserReducer', () => {
  it('should set auth user', () => {
    const initialState = null;
    const action = {
      type: ActionType.SET_AUTH_USER,
      payload: { authUser: { id: 'user-1', name: 'User' } },
    };

    const result = authUserReducer(initialState, action);
    expect(result).toEqual({ id: 'user-1', name: 'User' });
  });

  it('should unset auth user', () => {
    const initialState = { id: 'user-1', name: 'User' };
    const action = {
      type: ActionType.UNSET_AUTH_USER,
      payload: { authUser: null },
    };

    const result = authUserReducer(initialState, action);
    expect(result).toBeNull();
  });
});
