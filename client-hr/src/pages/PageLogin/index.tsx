import * as React from 'react';
import {
  connect,
  DispatchProp,
} from 'react-redux';
import {
  RouteComponentProps,
  withRouter
} from 'react-router-dom'

import apiUser from '../../api/v1/user';
import { appSetLogin } from '../../reducers/app/actions';

import { Card } from 'antd';

import TemplatePage from '../components/TemplatePage';
import FormAuthCreate from './FormAuthCreate';

interface IPageLoginProps extends DispatchProp, RouteComponentProps<any> {
  nothing?: string;
}
interface IPageLoginState {
  isCheckingJwt: boolean;
}

class PageLogin extends React.Component<IPageLoginProps, IPageLoginState> {
  constructor(props: IPageLoginProps) {
    super(props);

    this.state = {
      isCheckingJwt: true,
    };

    this.handleAuthCreate = this.handleAuthCreate.bind(this);
    this.handleNavigateToNext = this.handleNavigateToNext.bind(this);
  }

  public componentWillMount() {
    const jwt = window.localStorage.getItem('hr-jwt');

    if (jwt) {
      this.props.dispatch(appSetLogin(jwt));
      this.handleNavigateToNext();
    }
  }

  public handleAuthCreate(user: User) {
    return apiUser.create(user)
      .then((res: any) => {
        window.localStorage.setItem('hr-jwt', res.data.auth_token);
        return res;
      });
  }

  public handleNavigateToNext() {
    this.props.history.push('/main');
  }

  public render() {
    return (
      <TemplatePage
        title={'Login'}
        hideHeader={true}
        centerElements={true}
      >
        <Card style={{ width: 300 }}>
          <FormAuthCreate
            handleAuthCreate={this.handleAuthCreate}
            handleNavigateToNext={this.handleNavigateToNext}
          />
        </Card>
      </TemplatePage>
    )
  }
}

export default connect()(withRouter(PageLogin));
