import * as React from 'react';
import {
  RouteComponentProps,
  withRouter
} from 'react-router-dom'

import apiUser from '../../api/v1/user';

import { Card } from 'antd';

import TemplatePage from '../components/TemplatePage';
import FormUserCreate from './FormUserCreate';

interface IPageRegisterProps extends RouteComponentProps<any> {
  nothing?: string;
}
interface IPageRegisterState {
  isCheckingJwt: boolean;
  isFetching: boolean;
}

class PageRegister extends React.Component<IPageRegisterProps, IPageRegisterState> {
  constructor(props: IPageRegisterProps) {
    super(props);

    this.state = {
      isCheckingJwt: true,
      isFetching: false,
    };

    this.handleUserCreate = this.handleUserCreate.bind(this);
    this.handleNavigateToNext = this.handleNavigateToNext.bind(this);
  }

  public handleUserCreate(user: User) {
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
        title={'Register'}
        centerElements={true}
      >
        <Card style={{ width: 300 }}>
          <FormUserCreate
            handleUserCreate={this.handleUserCreate}
            handleNavigateToNext={this.handleNavigateToNext}
          />
        </Card>
      </TemplatePage>
    )
  }
}

export default withRouter(PageRegister);
