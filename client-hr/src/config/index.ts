export default {
  API_SERVER_URI: process.env.NODE_ENV === 'production'
    ? 'https://workstream-hr-api.herokuapp.com'
    : 'http://localhost:3000'
};
