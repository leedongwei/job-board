import axios from 'axios';
import { Reducer } from 'redux';

import {
  APP_RESET,
  APP_SET_LOGIN,
  APP_SET_VIEW_APPLICANTS,
  APP_SET_VIEW_JOB,
  APP_UNSET_LOGIN,
} from './actions';

const initialState: StateApp = {
  applicantIds: undefined,
  jobId: undefined,
  jwt: undefined,
}

export const appReducer: Reducer<StateApp> = (state = initialState, action) => {
  switch (action.type) {
    case APP_RESET:
      return initialState;

    case APP_SET_LOGIN:
      // HACK: Set bearer token here as this function is guaranteed to be called for login
      axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('hr-jwt')}`;

      return {
        ...state,
        jwt: action.payload.jwt,
      }
    case APP_UNSET_LOGIN:
      // HACK: Set bearer token here as this function is guaranteed to be called for logout
      axios.defaults.headers.common.Authorization = `Bearer undefined`;

      return {
        ...state,
        jwt: undefined,
      };


    case APP_SET_VIEW_JOB:
      return {
        ...state,
        jobId: action.payload.jobId,
      };

    case APP_SET_VIEW_APPLICANTS:
      return {
        ...state,
        applicantIds: action.payload.applicantIds,
      };

    default:
      return state;
  }
}
