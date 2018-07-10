import * as React from 'react';
import {
  connect,
  DispatchProp,
} from 'react-redux';
import {
  RouteComponentProps,
  withRouter
} from 'react-router-dom'

import apiCompany from '../../api/v1/company';
import apiUser from '../../api/v1/user';
import { appSetLogin } from '../../reducers/app/actions';

import { Card } from 'antd';

import TemplatePage from '../components/TemplatePage';
import FormUserCreate from './FormUserCreate';

interface IPageRegisterProps extends DispatchProp, RouteComponentProps<any> {
  jwt?: string;
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

    this.handleCompanyCreate = this.handleCompanyCreate.bind(this);
    this.handleUserCreate = this.handleUserCreate.bind(this);
    this.handleNavigateToNext = this.handleNavigateToNext.bind(this);
  }

  public componentWillMount() {
    const jwt = window.localStorage.getItem('hr-jwt');

    if (jwt) {
      this.props.dispatch(appSetLogin(jwt));
      this.handleNavigateToNext();
    }
  }

  public handleCompanyCreate(company: Company) {
    return apiCompany.create(company);
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
        hideHeader={true}
        centerElements={true}
      >
        <Card style={{ width: 300 }}>
          <FormUserCreate
            handleCompanyCreate={this.handleCompanyCreate}
            handleUserCreate={this.handleUserCreate}
            handleNavigateToNext={this.handleNavigateToNext}
          />
        </Card>
      </TemplatePage>
    )
  }
}

const mapStateToProps = (state: Store.State) => ({
  jwt: state.app.jwt,
})
export default connect(mapStateToProps)(withRouter(PageRegister));
