import * as React from 'react';
import { Link } from 'react-router-dom';

import {
  Button,
  Form,
  Icon,
  Input,
} from 'antd';
import { FormComponentProps } from 'antd/lib/form';

interface IFormAuthCreateProps extends FormComponentProps {
  handleAuthCreate: { (user: User): Promise<any> }; // tslint:disable-line
  handleNavigateToNext: { (): void }; // tslint:disable-line
}
interface IFormAuthCreateState {
  isFetching: boolean;
}

class FormAuthCreate extends React.Component<IFormAuthCreateProps, IFormAuthCreateState> {
  constructor(props: IFormAuthCreateProps) {
    super(props);

    this.state = {
      isFetching: false,
    };

    this.handleAuthCreate = this.handleAuthCreate.bind(this);
  }

  public async handleAuthCreate(e: React.FormEvent<HTMLInputElement>) {
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
      console.log(formValues);

      // 4 - API call
      const authResponse = await this.props.handleAuthCreate(user);
      console.log(authResponse);

      // 5 - Set form to normal, show success feedback
      this.setState({ isFetching: false });

      // 6 - Navigate to next screen
      this.props.handleNavigateToNext();
    } catch (e) {
      console.error(e);
      this.setState({ isFetching: false });
    }
  }

  public render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleAuthCreate} className={'login-form'}>
        <h1>HR LOGIN</h1>

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
                message: 'Please enter your password!',
                required: true,
              }, {
                type: 'string',
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
            Log in
          </Button>

          {
            !this.state.isFetching &&
            <div>
              Or <Link to={'/register'}>register now!</Link>
            </div>
          }
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(FormAuthCreate);;
