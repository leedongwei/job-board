import * as React from 'react';
import {
  connect,
  DispatchProp,
} from 'react-redux';
import { push } from 'react-router-redux';
import styled from 'styled-components';

import Form from 'antd/lib/form';
import { FormComponentProps } from 'antd/lib/form/Form';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import message from 'antd/lib/message';
import Modal from 'antd/lib/modal';
import { appSetLogin } from 'src/reducers/app/actions';

const LoginPromptText = styled.em`
  display: block;
  text-align: center;
  margin: 0 0 16px;
`;

interface IModalLoginProps extends FormComponentProps, DispatchProp {
  fetchAuthCreate: { (user: User): Promise<any> };
  fetchUserCreate: { (user: User): Promise<any> };
}
interface IModalLoginState {
  isFetching: boolean;
  isModalLoginVisible: boolean;
  isUsingLogin: boolean;
}

class ModalLogin extends React.Component<IModalLoginProps, IModalLoginState> {
  constructor(props: IModalLoginProps) {
    super(props);

    this.state = {
      isFetching: false,
      isModalLoginVisible: true,
      isUsingLogin: false,
    };

    this.handleToggleVisible = this.handleToggleVisible.bind(this);
    this.handleToggleLogin = this.handleToggleLogin.bind(this);
    this.handleSubmitLoginForm = this.handleSubmitLoginForm.bind(this);
  }

  public handleToggleVisible() {
    this.setState({ isModalLoginVisible: !this.state.isModalLoginVisible });
  }

  public handleToggleLogin() {
    this.setState({ isUsingLogin: !this.state.isUsingLogin });
  }

  public async handleSubmitLoginForm() {
    // 1 - Set form to fetching
    this.setState({ isFetching: true });

    try {
      // 2 - Validate form
      const formValues: any = await new Promise((resolve, reject) => { // tslint:disable-line:no-any
        this.props.form.validateFieldsAndScroll(
          { scroll: { offsetTop: 96 } },  // ($headerHeight) + (.ant-form-item-label height)
          (err, res) => {
            if (err) { reject(err); }
            if (!err) { resolve(res); }
          },
        );
      });

      // 3 - Type coercion
      const user = {
        email: formValues.email,
        name: formValues.name,
        password: formValues.password,
        title: formValues.title,
      } as User;

      const authResponse = this.state.isUsingLogin
        ? await this.props.fetchAuthCreate(user)
        : await this.props.fetchUserCreate(user);
      console.log(authResponse);

      this.setState({
        isFetching: false,
        isModalLoginVisible: false,
      });
      this.props.dispatch(appSetLogin(authResponse.data.auth_token));
      this.props.dispatch(push('/post'));
      message.success('You\'re logged in!');
    } catch (e) {
      this.setState({ isFetching: false });
      message.error(e.message);
    }
  }

  public render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Modal
        title={this.state.isUsingLogin ? 'Login' : 'Register to post jobs'}
        visible={this.state.isModalLoginVisible}
        okText={this.state.isUsingLogin ? 'Login' : 'Register' }
        onOk={() => this.handleSubmitLoginForm()}
        onCancel={this.handleToggleVisible}
      >
        <LoginPromptText>
          {
            !this.state.isUsingLogin
              ? (<span>If you have an account, <a onClick={this.handleToggleLogin}>click here to login</a></span>)
              : (<span><a onClick={this.handleToggleLogin}>Click here to register for an account</a></span>)
          }
        </LoginPromptText>

        {
          !this.state.isUsingLogin && (
            <div>
              <Form.Item>
                {
                  getFieldDecorator('name', {
                    rules: [{
                      required: true,
                      type: 'string',
                    }, {
                      max: 254,
                    }],
                  })(
                    <Input
                      prefix={<Icon type={'user'} style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder={'Name'}
                      disabled={this.state.isFetching}
                    />
                  )
                }
              </Form.Item>
              <Form.Item>
                {
                  getFieldDecorator('title', {
                    rules: [{
                      required: true,
                      type: 'string',
                    }, {
                      max: 254,
                    }],
                  })(
                    <Input
                      prefix={<Icon type={'idcard'} style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder={'Job Title'}
                      disabled={this.state.isFetching}
                    />
                  )
                }
              </Form.Item>
            </div>
          )
        }

        <Form.Item>
          {
            getFieldDecorator('email', {
              rules: [{
                required: true,
                type: 'email',
              }, {
                max: 254,
              }],
            })(
              <Input
                prefix={<Icon type={'mail'} style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder={'Email'}
                disabled={this.state.isFetching}
              />
            )
          }
        </Form.Item>
        <Form.Item>
          {
            getFieldDecorator('password', {
              rules: [{
                required: true,
                type: 'string',
              }, {
                min: 6,
              }, {
                max: 254,
              }],
            })(
              <Input
                prefix={<Icon type={'key'} style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder={'Password'}
                type={'password'}
                disabled={this.state.isFetching}
              />
            )
          }
        </Form.Item>
      </Modal>
    );
  }
}

export default connect()(Form.create()(ModalLogin));
