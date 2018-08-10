import * as React from 'react';
import DocumentTitle from 'react-document-title';
import {
  connect,
  DispatchProp,
} from 'react-redux';
import { push } from 'react-router-redux';
import styled from 'styled-components';

import apiAuth from '../../../api/v1/auth';
import apiUser from '../../../api/v1/user';
import {
  appReset,
  appSetLogin,
  appUnsetLogin,
} from '../../../reducers/app/actions';

import Button from 'antd/lib/button';
import Layout from 'antd/lib/layout';
import message from 'antd/lib/message';

import Logo from '../Logo';
import mediaQuery from '../styledComponents/mediaQuery';
import DropdownLocation from './DropdownLocation';
import ModalLogin from './ModalLogin';

const Header = styled(Layout.Header)`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  background: none !important;
  text-align: center;
  z-index: 10;

  button {
    margin: 0 5px;
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-top: 50px;
  background: none;

  ${mediaQuery.tablet`
    margin-top: 0px;
  `}
`;
const HeaderItem = styled.div`
  display: flex;
  flex-direction: row;
`;

interface IPageTemplateProps extends DispatchProp {
  title?: string;
  hideHeader?: boolean;
  centerElements?: boolean;
  jwt: string | undefined;
}
interface IPageTemplateState {
  isCheckingJwt: boolean;
  isLoginModalVisible: boolean;
}

class PageTemplate extends React.Component<IPageTemplateProps, IPageTemplateState> {
  constructor(props: IPageTemplateProps) {
    super(props);

    this.state = {
      isCheckingJwt: !this.props.jwt,
      isLoginModalVisible: false,
    }

    this.fetchUserCreate = this.fetchUserCreate.bind(this);
    this.fetchAuthCreate = this.fetchAuthCreate.bind(this);
    this.fetchAuthRemove = this.fetchAuthRemove.bind(this);
  }

  public componentDidMount() {
    if (!this.state.isCheckingJwt) { return; }
    if (this.props.jwt) { return; }

    const jwt = window.localStorage.getItem('hr-jwt');
    if (jwt) {
      this.props.dispatch(appSetLogin(jwt));
    }
  }

  public fetchAuthCreate(user: User) {
    return apiAuth.create(user)
      .then((res: any) => {
        window.localStorage.setItem('hr-jwt', res.data.auth_token);
        return res;
      });
  }

  public fetchAuthRemove() {
    window.localStorage.setItem('hr-jwt', '');
    this.props.dispatch(appUnsetLogin());
    this.props.dispatch(appReset());
    this.props.dispatch(push('/'));

    message.success('You\'re logged out!');
    return Promise.resolve();
  }

  public fetchUserCreate(user: User) {
    return apiUser.create(user)
      .then((res: any) => {
        window.localStorage.setItem('hr-jwt', res.data.auth_token);
        return res;
      });
  }

  public render() {
    return (
      <DocumentTitle title={'got.work | Find and apply to hourly jobs'}>
        <Layout>
          <Header>
            <Logo/>
          </Header>

          <Header>
            <HeaderWrapper>
              <HeaderItem>
                <DropdownLocation />
              </HeaderItem>

              <HeaderItem>
                <Button
                  style={{
                    backgroundColor: '#FF4742',
                    border: 'none',
                    color: '#FFF',
                  }}
                  onClick={(e: any) => {
                    e.preventDefault();

                    if (this.props.jwt) {
                      this.props.dispatch(push('/post'));
                    } else {
                      this.setState({ isLoginModalVisible: true });
                    }
                  }}
                >
                  Post a job
                </Button>

                {
                  !!this.props.jwt &&
                  <Button
                    onClick={(e: any) => {
                      e.preventDefault();
                      this.fetchAuthRemove();
                    }}
                  >
                    Logout
                  </Button>
                }
              </HeaderItem>
            </HeaderWrapper>

            {
              this.state.isLoginModalVisible &&
              <ModalLogin
                fetchAuthCreate={this.fetchAuthCreate}
                fetchUserCreate={this.fetchUserCreate}
              />
            }
          </Header>

          <Layout.Content className={this.props.centerElements ? 'flex-center' : ''}>
            {this.props.children}
          </Layout.Content>
        </Layout>
      </DocumentTitle>
    )
  }
}

const mapStateToProps = (state: Store.State) => ({
  jwt: state.app.jwt,
})
export default connect(mapStateToProps)(PageTemplate);
