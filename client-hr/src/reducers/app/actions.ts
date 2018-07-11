import {
  Action,
  ActionCreator,
} from 'redux';

export const APP_RESET = 'APP_RESET';
export const APP_SET_LOGIN = 'APP_SET_LOGIN';
export const APP_UNSET_LOGIN = 'APP_UNSET_LOGIN';

export const APP_SET_VIEW_JOB = 'APP_SET_VIEW_JOB';
export const APP_SET_VIEW_APPLICANTS = 'APP_SET_VIEW_APPLICANTS';

export const appReset: ActionCreator<Action> = () => {
  return {
    type: APP_RESET,
  };
};

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

export const appSetViewJob: ActionCreator<Action> = (jobId: string) => {
  return {
    payload: { jobId },
    type: APP_SET_VIEW_JOB,
  };
};

export const appSetViewApplicants: ActionCreator<Action> = (applicantIds: string[]) => {
  return {
    payload: { applicantIds },
    type: APP_SET_VIEW_APPLICANTS,
  };
};
