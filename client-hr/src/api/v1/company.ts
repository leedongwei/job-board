import axios from 'axios';
import * as querystring from 'querystring';

import CONFIG from '../../config';
import { store } from '../../index';
import {
  dataSetCompanies,
} from '../../reducers/data/actions';

export default {
  find: () => {
    return axios
      .get(`${CONFIG.API_SERVER_URI}/companies`)
      .then((res) => {
        store.dispatch(dataSetCompanies(res.data))
        return res;
      });
  },

  create: (company: Company) => {
    return axios
      .post(`${CONFIG.API_SERVER_URI}/companies`, querystring.stringify(company))
      .then((res) => {
        store.dispatch(dataSetCompanies(res.data))
        return res;
      });
  },
};
