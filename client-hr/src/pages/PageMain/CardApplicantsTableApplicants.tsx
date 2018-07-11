import * as React from 'react';
import {
  connect,
  DispatchProp,
} from 'react-redux';

import apiApplicant from '../../api/v1/applicant';
// import { appSetViewJob } from '../../reducers/app/actions';

import Button from 'antd/lib/button';
import Table from 'antd/lib/table';
// import Spin from 'antd/lib/spin';

// import CardApplicantsTableApplicantsItem from './CardApplicantsTableApplicantsItem';

interface ICardApplicantsTableApplicantsProps extends DispatchProp {
  app: {
    jobId: string;
  };
  data: {
    company: Company;
    jobs: Job[] | undefined;
    applicants: Applicant[] | undefined;
  }
}
interface ICardApplicantsTableApplicantsState {
  isFetching: boolean;
}

class CardApplicantsTableApplicants extends React.Component<ICardApplicantsTableApplicantsProps, ICardApplicantsTableApplicantsState> {
  constructor(props: ICardApplicantsTableApplicantsProps) {
    super(props);

    this.state = {
      isFetching: false,
    };

    this.handleApplicantsFind = this.handleApplicantsFind.bind(this);
    this.handleApplicantCreate = this.handleApplicantCreate.bind(this);
  }

  public componentDidMount() {
    this.handleApplicantsFind(this.props.app.jobId);
  }

  public componentWillReceiveProps(nextProps: ICardApplicantsTableApplicantsProps) {
    if (nextProps.app.jobId !== this.props.app.jobId) {
      this.handleApplicantsFind(nextProps.app.jobId);
    }
  }

  public handleApplicantsFind(jobId: string) {
    const company = this.props.data.company;

    if (company && company.id && jobId) {
      this.setState({ isFetching: true });

      apiApplicant.find(company.id, jobId)
        .then(() => {
          this.setState({ isFetching: false });
        })
        .catch(() => {
          this.setState({ isFetching: false });
        });
    }
  }

  public handleApplicantCreate() {
    const company = this.props.data.company;
    const jobId = this.props.app.jobId;

    if (company && company.id && jobId) {
      apiApplicant.create(company.id, jobId, {
        email: 'hello@world.com',
        name: 'Hello World',
        phone: Date.now().toString(),
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
    }
  }

  public render() {
    if (!this.props.app.jobId) {
      return <p>Please select a job on the left</p>;
    }

    const columns = [{
      dataIndex: 'name',
      key: 'name',
      title: 'Name',
    }, {
      dataIndex: 'email',
      key: 'email',
      title: 'Email',
    }, {
      dataIndex: 'phone',
      key: 'phone',
      title: 'Phone',
    }];

    return (
      <>
        <Button type={'primary'} onClick={this.handleApplicantCreate}>Add stub applicant</Button>
        <Table
          rowKey={'id'}
          dataSource={this.props.data.applicants}
          columns={columns}
        />
      </>
    );
  }
}

const mapStateToProps = (state: Store.State) => ({
  app: {
    jobId: state.app.jobId,
  },
  data: {
    applicants: state.data.applicants && state.data.applicants,
    company: state.data.companies && state.data.companies[0],
    jobs: state.data.jobs,
  },
})
export default connect(mapStateToProps)(CardApplicantsTableApplicants);
