import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom'
// import {
//   applyMiddleware,
//   combineReducers,
//   compose,
//   createStore,
// } from 'redux';
// import promiseMiddleware from 'redux-promise-middleware';
// import thunk from 'redux-thunk';

// import createHistory from 'history/createBrowserHistory';

import App from './app';
// import registerServiceWorker from './lib/registerServiceWorker';

// const rootReducer = combineReducers({
//   router: routerReducer,
// });

// const history = createHistory();

// const store = createStore(
//   rootReducer,
//   compose(
//     applyMiddleware(
//       routerMiddleware(history),
//       thunk,
//       promiseMiddleware(),
//     ),
//   ),
// );

ReactDOM.render(
  <Router>
    <App/>
  </Router>,
  document.getElementById('root') as HTMLElement,
);

// registerServiceWorker();
