import { Reducer } from 'redux';

import {
  APP_SET_LOGIN,
  APP_UNSET_LOGIN,
} from './actions';

const initialState: StateApp = {
  jwt: undefined,
}

export const appReducer: Reducer<StateApp> = (state = initialState, action) => {
  switch (action.type) {
    case APP_SET_LOGIN:
      return {
        ...state,
        jwt: action.payload.jwt,
      }
    case APP_UNSET_LOGIN:
      return {
        ...state,
        jwt: undefined,
      };
    default:
      return state;
  }
}
