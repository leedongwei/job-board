import * as React from 'react';
import {
  connect,
  DispatchProp,
} from 'react-redux';

import apiJob from '../../api/v1/job';

import Form, { FormComponentProps } from 'antd/lib/form';
import Input from 'antd/lib/input';
import TextArea from 'antd/lib/input/TextArea';
import message from 'antd/lib/message';
import Modal from 'antd/lib/modal';

interface IModalJobProps extends DispatchProp, FormComponentProps {
  data: {
    company: Company;
  };
  job?: Job;
  isVisible?: boolean;
  toggleVisible: { (): void };
}
interface IModalJobState {
  isFetching: boolean;
}

class ModalJob extends React.Component<IModalJobProps, IModalJobState> {
  constructor(props: IModalJobProps) {
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

      // 2.1 Manual checks
      const company = this.props.data.company;
      if (!company) {
        throw new Error('No company associated with this user');
      }

      // 3 - Type coercion
      const job = {
        description: formValues.description,
        title: formValues.title,
      };

      // 4 - API call
      const jobCreateReponse = this.props.job
        ? await this.handleUpdateJob({ ...job, id: this.props.job.id })
        : await this.handleCreateJob(job);
      console.log(jobCreateReponse);

      // 5 - Set form to normal, show success feedback
      this.setState({ isFetching: false });
      this.props.form.resetFields();
      message.success('Job data is saved!');

      // 6 - Navigate to next screen
      this.props.toggleVisible();
    } catch (e) {
      message.error(e.message);
      console.error(e);
      this.setState({ isFetching: false });
    }
  }

  public handleCreateJob(job: Job) {
    const company = this.props.data.company;

    if (company && company.id) {
      apiJob.create(company.id, job)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
        })
    }
  }

  public handleUpdateJob(job: Job) {
    const company = this.props.data.company;

    if (company && company.id) {
      apiJob.update(company.id, job)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
        })
    }
  }

  public render() {
    const { getFieldDecorator } = this.props.form;
    const job = this.props.job;

    return (
      <Modal
        title={!job ? 'Creating new job' : 'Editing a job'}
        visible={this.props.isVisible}
        onOk={this.handleSubmitForm}
        onCancel={this.props.toggleVisible}
      >
        <Form.Item label={'Job title'}>
          {
            getFieldDecorator('title', {
              initialValue: job ? job.title : '',
              rules: [{
                message: 'Please set a job title!',
                required: true,
              }],
            })(
              <Input disabled={this.state.isFetching}/>
            )
          }
        </Form.Item>
        <Form.Item label={'Job description'}>
          {
            getFieldDecorator('description', {
              initialValue: job ? job.description : '',
              rules: [{
                message: 'Please enter a job description',
                required: true,
              }],
            })(
              <TextArea rows={5} disabled={this.state.isFetching}/>
            )
          }
        </Form.Item>
      </Modal>
    )
  }
}

const mapStateToProps = (state: Store.State) => ({
  data: {
    company: state.data.companies && state.data.companies[0],
  },
})
export default connect(mapStateToProps)(Form.create()(ModalJob));
