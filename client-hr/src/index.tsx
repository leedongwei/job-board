import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  ConnectedRouter,
  routerMiddleware,
  routerReducer,
} from 'react-router-redux';
import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';

import createHistory from 'history/createBrowserHistory';

import 'antd/dist/antd.css';
import App from './app';
import * as reducers from './reducers';
// import registerServiceWorker from './lib/registerServiceWorker';
import './styles.css';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // tslint:disable-line:no-any

const rootReducer = combineReducers({
  ...reducers,
  router: routerReducer,
});

const history = createHistory();

export const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      routerMiddleware(history),
      thunk,
      promiseMiddleware(),
    ),
  ),
);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App/>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement,
);

// registerServiceWorker();
