import {
  Action,
  ActionCreator,
} from 'redux';

export const APP_SET_LOGIN = 'APP_SET_LOGIN';
export const APP_UNSET_LOGIN = 'APP_UNSET_LOGIN';

export const appSetLogin: ActionCreator<Action> = (jwt: string) => {
  return {
    payload: { jwt },
    type: APP_SET_LOGIN,
  };
};

export const appUnsetLogin: ActionCreator<Action> = () => {
  return {
    type: APP_UNSET_LOGIN,
  };
};
