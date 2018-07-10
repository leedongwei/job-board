import * as React from 'react';
import {
  connect,
  DispatchProp,
} from 'react-redux';

import { appSetLogin } from './reducers/app/actions';

import Routes from './routes';

// interface IAppProps extends DispatchProp {
// }

class App extends React.Component<DispatchProp> {
  public componentWillMount() {
    const jwt = window.localStorage.getItem('hr-jwt');

    if (jwt) {
      this.props.dispatch(appSetLogin(jwt));
    }
  }

  public render() {
    return (
      <Routes/>
    );
  }
}


export default connect()(App);
