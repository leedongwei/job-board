import { Reducer } from 'redux';

import {
  DATA_ADD_JOBS,
  DATA_SET_COMPANIES,
  DATA_SET_JOBS,
} from './actions';

const initialState: StateData = {
  companies: undefined,
  jobs: undefined,
}

export const dataReducer: Reducer<StateData> = (state = initialState, action) => {
  switch (action.type) {
    case DATA_SET_COMPANIES:
      return {
        ...state,
        companies: action.payload.companies
          .sort((a: any, b: any) => b.id - a.id),
      };

    case DATA_SET_JOBS:
      return {
        ...state,
        jobs: action.payload.jobs
          .sort((a: any, b: any) => b.id - a.id),
      };

    case DATA_ADD_JOBS:
      const jobs = Array.isArray(action.payload.jobs)
        ? action.payload.jobs
        : [action.payload.jobs];
      const prevJobs = state.jobs || [];

      jobs.forEach((job: Job) => {
        const i = prevJobs.findIndex(j => j.id === job.id);

        if (i >= 0) {
          prevJobs[i] = job;
        } else {
          prevJobs.push(job);
        }
      });

      return {
        ...state,
        jobs: prevJobs
          .sort((a: any, b: any) => b.id - a.id),
      };

    default:
      return state;
  }
}
