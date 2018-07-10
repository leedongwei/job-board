import * as React from 'react';
import { connect } from 'react-redux';
import { Route, RouteProps } from 'react-router';

import PageLogin from '../../../pages/PageLogin';

interface IPrivateRouteProps extends RouteProps {
  isAuthenticated: boolean;
}

class PrivateRoute extends React.Component<IPrivateRouteProps> {
  public render() {
    const { isAuthenticated, component: Component, ...props } = this.props;

    if (isAuthenticated) {
      return <Route {...props} component={Component}/>;
    }

    return <Route {...props} render={() => <PageLogin/>}/>;
  }
}

const mapStateToProps = (state: Store.State) => ({
  isAuthenticated: !!state.app.jwt,
});
export default connect(mapStateToProps)(PrivateRoute);
