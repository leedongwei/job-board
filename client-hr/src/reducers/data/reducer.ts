import { Reducer } from 'redux';

import {
  APP_RESET
} from '../app/actions';
import {
  DATA_ADD_APPLICANTS,
  DATA_ADD_JOBS,
  DATA_SET_APPLICANTS,
  DATA_SET_COMPANIES,
  DATA_SET_JOBS,
} from './actions';

const initialState: StateData = {
  applicants: undefined,
  companies: undefined,
  jobs: undefined,
}

export const dataReducer: Reducer<StateData> = (state = initialState, action) => {
  switch (action.type) {
    case APP_RESET:
      return initialState;

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
      const jobs = action.payload.jobs;
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

    case DATA_SET_APPLICANTS:
      return {
        ...state,
        applicants: action.payload.applicants
          .sort((a: any, b: any) => b.id - a.id),
      };

    case DATA_ADD_APPLICANTS:
      const applicants = action.payload.applicants;
      const prevApplicants = state.applicants || [];

      applicants.forEach((applicant: Applicant) => {
        const i = prevApplicants.findIndex(a => a.id === applicant.id);

        if (i >= 0) {
          prevApplicants[i] = applicant;
        } else {
          prevApplicants.push(applicant);
        }
      });

      return {
        ...state,
        applicants: prevApplicants
          .sort((a: any, b: any) => b.id - a.id),
      };

    default:
      return state;
  }
}
