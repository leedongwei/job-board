import * as React from 'react';
import {
  connect,
  DispatchProp,
} from 'react-redux';
import { Link } from 'react-router-dom';

import { appSetLogin } from '../../reducers/app/actions';

import Button from 'antd/lib/button';
import Form, { FormComponentProps } from 'antd/lib/form';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import message from 'antd/lib/message';

interface IFormUserCreateProps extends DispatchProp, FormComponentProps {
  handleCompanyCreate: { (company: Company): Promise<any> }; // tslint:disable-line
  handleUserCreate: { (user: User): Promise<any> }; // tslint:disable-line
  handleNavigateToNext: { (): void }; // tslint:disable-line
}
interface IFormUserCreateState {
  isFetching: boolean;
}

class FormUserCreate extends React.Component<IFormUserCreateProps, IFormUserCreateState> {
  constructor(props: IFormUserCreateProps) {
    super(props);

    this.state = {
      isFetching: false,
    };

    this.handleSubmitForm = this.handleSubmitForm.bind(this);
  }

  public async handleSubmitForm(e: React.FormEvent<HTMLInputElement>) {
     // 1 - Set form to fetching
     e.preventDefault();
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
        password: formValues.password,
      };
      const company = {
        name: formValues.company,
      };

      // 4 - API call
      const userCreateReponse = await this.props.handleUserCreate(user);
      await this.props.dispatch(appSetLogin(userCreateReponse.data.auth_token));
      await this.props.handleCompanyCreate(company);

      // 5 - Set form to normal, show success feedback
      this.setState({ isFetching: false });

      // 6 - Navigate to next screen
      this.props.handleNavigateToNext();
    } catch (e) {
      message.error(e.message);
      console.error(e);
      this.setState({ isFetching: false });
    }
  }

  public render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmitForm} className={'login-form'}>
        <h1>Register new account</h1>

        <Form.Item>
          {
            getFieldDecorator('company', {
              rules: [{
                message: 'Please set a company name!',
                required: true,
              }, {
                type: 'string',
              }],
            })(
              <Input
                prefix={<Icon type={'home'} style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder={'Company Name'}
                disabled={this.state.isFetching}
              />
            )
          }
        </Form.Item>

        <Form.Item>
          {
            getFieldDecorator('email', {
              rules: [{
                message: 'Please enter your email address',
                required: true,
              }, {
                message: 'Please use a valid email address',
                type: 'email',
              }],
            })(
              <Input
                prefix={<Icon type={'user'}
                style={{ color: 'rgba(0,0,0,.25)' }} />}
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
                message: 'Please set a password!',
                required: true,
              }, {
                type: 'string',
              }, {
                message: 'Please have a longer password (8+ characters)',
                min: 8,
              }],
            })(
              <Input
                prefix={<Icon type={'lock'} style={{ color: 'rgba(0,0,0,.25)' }} />}
                type={'password'}
                placeholder={'Password'}
                disabled={this.state.isFetching}
              />
            )
          }
        </Form.Item>

        <Form.Item>
          <Button
            style={{ width: '100% '}}
            type={'primary'}
            htmlType={'submit'}
            className={'login-form-button'}
            disabled={this.state.isFetching}
          >
            Register
          </Button>

          {
            !this.state.isFetching &&
            <div>
              Registered? <Link to={'/login'}>Login now!</Link>
            </div>
          }
        </Form.Item>
      </Form>
    );
  }
}

export default connect()(Form.create()(FormUserCreate));
