import axios from 'axios';
import * as querystring from 'querystring';

import CONFIG from '../../config';
import { store } from '../../index';
import {
  dataAddJobs,
  dataSetJobs,
} from '../../reducers/data/actions';

export default {
  find: (companyId: string) => {
    return axios
      .get(`${CONFIG.API_SERVER_URI}/companies/${companyId}/jobs`)
      .then((res) => {
        store.dispatch(dataSetJobs(res.data))
        return res;
      });
  },

  create: (companyId: string, job: Job) => {
    return axios
      .post(`${CONFIG.API_SERVER_URI}/companies/${companyId}/jobs`, querystring.stringify(job))
      .then((res) => {
        store.dispatch(dataAddJobs(res.data.jobs))
        return res;
      });
  },

  update: (companyId: string, job: Job) => {
    return axios
      .put(`${CONFIG.API_SERVER_URI}/companies/${companyId}/jobs/${job.id}`, querystring.stringify(job))
      .then((res) => {
        store.dispatch(dataAddJobs(res.data))
        return res;
      });
  }
};
