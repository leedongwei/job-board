import {
  Action,
  ActionCreator,
} from 'redux';

export const DATA_SET_USER = 'DATA_SET_USER';
export const DATA_SET_USER_COMPANY = 'DATA_SET_USER_COMPANY';

export const DATA_SET_COMPANIES = 'DATA_SET_COMPANIES';

export const DATA_SET_JOBS = 'DATA_SET_JOBS';
export const DATA_ADD_JOBS = 'DATA_ADD_JOBS';

export const DATA_SET_APPLICANTS = 'DATA_SET_APPLICANTS';
export const DATA_ADD_APPLICANTS = 'DATA_ADD_APPLICANTS';

export const dataSetUser: ActionCreator<Action> = (user: User) => {
  return {
    payload: { user },
    type: DATA_SET_USER,
  };
};

export const dataSetUserCompany: ActionCreator<Action> = (userCompany: Company) => {
  return {
    payload: { userCompany },
    type: DATA_SET_USER_COMPANY,
  };
};

export const dataSetCompanies: ActionCreator<Action> = (companies: Company | Company[]) => {
  return {
    payload: { companies: Array.isArray(companies) ? companies : [companies] },
    type: DATA_SET_COMPANIES,
  };
};

export const dataSetJobs: ActionCreator<Action> = (jobs: Job[]) => {
  return {
    payload: { jobs },
    type: DATA_SET_JOBS,
  };
};

export const dataAddJobs: ActionCreator<Action> = (jobs: Job | Job[]) => {
  return {
    payload: { jobs: Array.isArray(jobs) ? jobs : [jobs] },
    type: DATA_ADD_JOBS,
  };
};

export const dataSetApplicants: ActionCreator<Action> = (applicants: Applicant[]) => {
  return {
    payload: { applicants },
    type: DATA_SET_APPLICANTS,
  };
};

export const dataAddApplicants: ActionCreator<Action> = (applicants: Applicant | Applicant[]) => {
  return {
    payload: { applicants: Array.isArray(applicants) ? applicants : [applicants] },
    type: DATA_ADD_APPLICANTS,
  };
};
