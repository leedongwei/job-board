import axios from 'axios';
import * as querystring from 'querystring';

import CONFIG from '../../config';

export default {
  create: (company: Company) => {
    return axios.post(`${CONFIG.API_SERVER_URI}/companies`, querystring.stringify(company));
  }
};
