export default {
  API_SERVER_URI: process.env.NODE_ENV === 'production'
    ? ''
    : 'http://localhost:3000'
};
