import axios from 'axios';
import * as querystring from 'querystring';

import CONFIG from '../../config';

export default {
  create: (user: User) => {
    return axios.post(`${CONFIG.API_SERVER_URI}/auth/create`, querystring.stringify(user));
  }
};
