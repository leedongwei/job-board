import * as React from 'react';
import {
  connect,
  DispatchProp,
} from 'react-redux';
import { Route, RouteProps } from 'react-router';

import apiUser from '../../../api/v1/user';
import { dataSetUser } from '../../../reducers/data/actions';

import PageMain from '../../../pages/PageMain';

interface IPrivateRouteProps extends DispatchProp, RouteProps {
  isAuthenticated: boolean;
  user: User | undefined;
}

class PrivateRoute extends React.Component<IPrivateRouteProps> {
  public componentDidMount() {
    this.fetchUser();
  }

  public componentWillReceiveProps(nextProps: IPrivateRouteProps) {
    this.fetchUser();
  }

  /**
   * HACK: This is a really bad hack that will cause the API call to fire twice
   */
  public fetchUser() {
    if (!this.props.isAuthenticated) { return; }
    if (this.props.user) { return; }

    apiUser.get()
      .then((res) => {
        const user: User = res.data.user;
        this.props.dispatch(dataSetUser(user))
      })
  }

  public render() {
    const { isAuthenticated, component: Component, ...props } = this.props;

    if (isAuthenticated) {
      return <Route {...props} component={Component}/>;
    }

    return <Route {...props} render={() => <PageMain/>}/>;
  }
}

const mapStateToProps = (state: Store.State) => ({
  isAuthenticated: !!state.app.jwt,
  user: state.data.user,
});
export default connect(mapStateToProps)(PrivateRoute);
