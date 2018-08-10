import * as React from 'react';
// import styled from 'styled-components';

import Button from 'antd/lib/button';
import Col from 'antd/lib/col';
import Form, { FormComponentProps } from 'antd/lib/form';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import InputNumber from 'antd/lib/input-number'
import message from 'antd/lib/message';
import Row from 'antd/lib/row';
// import Upload from 'antd/lib/upload';

interface IFormCompanyProps extends FormComponentProps {
  company?: Company;
  isVisible: boolean;
  fetchCompanyCreate: { (company: Company): Promise<any> };
  fetchCompanyPatch: { (company: Company): Promise<any> };
}
interface IFormCompanyState {
  isFetching: boolean;
}

class FormCompany extends React.Component<IFormCompanyProps, IFormCompanyState> {
  constructor(props: IFormCompanyProps) {
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
      const company = {
        address: formValues.address,
        city: formValues.city,
        logo: formValues.logo || 'https://en.m.wikipedia.org/wiki/File:000080_Navy_Blue_Square.svg',
        name: formValues.name,
        state: formValues.state,
        // user_id: '',
        zip: formValues.zip,
      } as Company;

      this.props.company
        ? await this.props.fetchCompanyPatch({ ...company, id: this.props.company.id })
        : await this.props.fetchCompanyCreate(company);

      this.setState({ isFetching: false });
      message.success('Saved company info!');
    } catch (e) {
      console.error(e);
      this.setState({ isFetching: false });
      message.error(e.message);
    }
  }

  public render() {
    const { getFieldDecorator } = this.props.form;
    const company = this.props.company;
    const UploadButton = (
      <div>
        <Icon type={this.state.isFetching ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <div className={'form-post'}>
        <Form.Item
          label={<strong>What is your company name?</strong>}
          colon={false}
        >
          {
            getFieldDecorator('name', {
              initialValue: company ? company.name : '',
              rules: [{
                required: true,
                type: 'string',
              }],
            })(
              <Input
                size={'large'}
                disabled={this.state.isFetching}
              />
            )
          }
        </Form.Item>
        {/*
        <Form.Item
          label={<strong>What is your company logo?</strong>}
          colon={false}
        >
          {
            getFieldDecorator('logo', {
              rules: [{
                required: false,
              }],
            })(
              <Upload
                listType={'picture-card'}
                className={'avatar-uploader'}
                showUploadList={false}
                // action="//jsonplaceholder.typicode.com/posts/"
                // beforeUpload={beforeUpload}
                // onChange={this.handleChange}
                disabled={this.state.isFetching}
              >
                {UploadButton}
                {/* {imageUrl ? <img src={imageUrl} alt="avatar" /> : UploadButton} /}
              </Upload>
            )
          }
        </Form.Item>*/}
        <Form.Item
          label={<strong>Where is your business located?</strong>}
          colon={false}
        >
          {
            getFieldDecorator('address', {
              initialValue: company ? company.address : '',
              rules: [{
                required: true,
                type: 'string',
              }],
            })(
              <Input
                size={'large'}
                disabled={this.state.isFetching}
              />
            )
          }
        </Form.Item>

        <Row gutter={8}>
          <Col xs={9}>
            <Form.Item
              label={<strong>City</strong>}
              colon={false}
            >
              {
                getFieldDecorator('city', {
                  initialValue: company ? company.city : '',
                  rules: [{
                    required: true,
                    type: 'string',
                  }],
                })(
                  <Input
                    placeholder={''}
                    size={'large'}
                    disabled={this.state.isFetching}
                  />
                )
              }
            </Form.Item>
          </Col>
          <Col xs={9}>
            <Form.Item
              label={<strong>State</strong>}
              colon={false}
            >
              {
                getFieldDecorator('state', {
                  initialValue: company ? company.state : 'CA',
                  rules: [{
                    required: true,
                    type: 'string',
                  }],
                })(
                  <Input
                    placeholder={'State'}
                    size={'large'}
                    disabled={this.state.isFetching || true}
                  />
                )
              }
            </Form.Item>
          </Col>
          <Col xs={6}>
            <Form.Item
              label={<strong>Zipcode</strong>}
              colon={false}
            >
              {
                getFieldDecorator('zip', {
                  initialValue: company ? Number(company.zip) : '',
                  rules: [{
                    required: true,
                  }, {
                    type: 'number',
                  }],
                })(
                  <InputNumber
                    min={0}
                    max={999999}
                    placeholder={''}
                    disabled={this.state.isFetching}
                    style={{ width: '100%' }}
                    size={'large'}
                  />
                )
              }
            </Form.Item>
          </Col>
        </Row>

        <Button
          type={'primary'}
          style={{ width: '100%' }}
          size={'large'}
          disabled={this.state.isFetching}
          onClick={this.handleSubmitForm}
        >
          Save company info
        </Button>
      </div>
    );
  }
}

export default Form.create()(FormCompany);
