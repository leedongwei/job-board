import * as React from 'react';import {
  connect,
  DispatchProp,
} from 'react-redux';
import { push } from 'react-router-redux';

import Button from 'antd/lib/button';
import Checkbox from 'antd/lib/checkbox';
import Col from 'antd/lib/col';
import Form, { FormComponentProps } from 'antd/lib/form';
import Input from 'antd/lib/input';
import message from 'antd/lib/message';
import Row from 'antd/lib/row';

interface IFormJobProps extends FormComponentProps, DispatchProp {
  company?: Company;
  isDisabled: boolean;
  fetchJobCreate: { (job: Job): Promise<any> };
}
interface IFormJobState {
  isFetching: boolean;
}

class FormJob extends React.Component<IFormJobProps, IFormJobState> {
  constructor(props: IFormJobProps) {
    super(props);

    this.state = {
      isFetching: false,
    };

    this.handleSubmitForm = this.handleSubmitForm.bind(this);
  }


  public async handleSubmitForm() {
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
      const job = {
        application_link: formValues.application_link,
        approved: true,
        description: formValues.description,
        tags: JSON.stringify(formValues.tags),
        title: formValues.title,
      } as Job;
      console.log(formValues)

      await this.props.fetchJobCreate(job)

      this.setState({ isFetching: false });
      message.success('Posted job position!');
      this.props.dispatch(push('/'));
    } catch (e) {
      console.error(e);
      this.setState({ isFetching: false });
      message.error(e.message);
    }
  }

  public render() {
    const { getFieldDecorator } = this.props.form;
    const options = [
      'Accounting & Finance',
      'Automotive',
      'Construction',
      'Customer Service',
      'Education',
      'Health & Beauty',
      'Healthcare',
      'Hotel & Hospitality',
      'Restaurant',
      'Retail',
      'Sales & Marketing',
      'Telecommunications',
    ];

    return (
      <div className={'form-post'}>
        <Form.Item
          label={<strong>What position are you hiring?</strong>}
          colon={false}
        >
          {
            getFieldDecorator('title', {
              rules: [{
                required: true,
                type: 'string',
              }],
            })(
              <Input
                size={'large'}
                disabled={this.state.isFetching || this.props.isDisabled}
              />
            )
          }
        </Form.Item>
        <Form.Item
          label={<strong>What is the job description?</strong>}
          colon={false}
        >
          {
            getFieldDecorator('description', {
              rules: [{
                required: true,
                type: 'string',
              }],
            })(
              <Input.TextArea
                rows={10}
                disabled={this.state.isFetching || this.props.isDisabled}
              />
            )
          }
        </Form.Item>
        <Form.Item
          label={<strong>What is the website or email to apply?</strong>}
          colon={false}
        >
          {
            getFieldDecorator('application_link', {
              rules: [{
                required: true,
                type: 'string',
              }],
            })(
              <Input
                placeholder={'www.your-company.com/apply or apply@your-company.com'}
                size={'large'}
                disabled={this.state.isFetching || this.props.isDisabled}
              />
            )
          }
        </Form.Item>
        <Form.Item
          label={<strong>Tags</strong>}
          colon={false}
        >
          {
            getFieldDecorator('tags', {
              rules: [{
                required: true,
              }],
            })(
              <Checkbox.Group disabled={this.state.isFetching || this.props.isDisabled}>
                <Row gutter={8}>
                  {
                    options.map(o => (
                      <Col xs={12} key={o}>
                        <Checkbox value={o}>{o}</Checkbox>
                      </Col>
                    ))
                  }
                </Row>
              </Checkbox.Group>
            )
          }
        </Form.Item>

        <Button
          type={'primary'}
          style={{ width: '100%' }}
          size={'large'}
          disabled={this.state.isFetching || this.props.isDisabled}
          onClick={this.handleSubmitForm}
        >
          Post the job <u>for free!</u>
        </Button>
      </div>
    );
  }
}

export default connect()(Form.create()(FormJob));
