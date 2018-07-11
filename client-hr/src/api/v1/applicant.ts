import axios from 'axios';
import * as querystring from 'querystring';

import CONFIG from '../../config';
import { store } from '../../index';
import {
  dataAddApplicants,
  dataSetApplicants
} from '../../reducers/data/actions';

export default {
  find: (companyId: string, jobId: string) => {
    return axios
      .get(`${CONFIG.API_SERVER_URI}/companies/${companyId}/jobs/${jobId}/applicants`)
      .then((res) => {
        console.log(res);
        store.dispatch(dataSetApplicants(res.data))
        return res;
      });
  },

  create: (companyId: string, jobId: string, applicant: Applicant) => {
    return axios
      .post(`${CONFIG.API_SERVER_URI}/companies/${companyId}/jobs/${jobId}/applicants`, querystring.stringify(applicant))
      .then((res) => {
        console.log(res);
        store.dispatch(dataAddApplicants(res.data.applicants))
        return res;
      });
  },
};
