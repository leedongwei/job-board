import * as React from 'react';
import {
  connect,
  DispatchProp,
} from 'react-redux';

import apiJob from '../../api/v1/job';
import { appSetViewJob } from '../../reducers/app/actions';

// import Button from 'antd/lib/button';
import List from 'antd/lib/list';
// import Spin from 'antd/lib/spin';

import CardJobsListJobsItem from './CardJobsListJobsItem';

interface ICardJobsListJobsProps extends DispatchProp {
  app: {
    jobId: string;
  };
  data: {
    company: Company;
    jobs: Job[] | undefined;
  }
}
interface ICardJobsListJobsState {
  isFetching: boolean;
}

class CardJobsListJobs extends React.Component<ICardJobsListJobsProps, ICardJobsListJobsState> {
  constructor(props: ICardJobsListJobsProps) {
    super(props);

    this.state = {
      isFetching: false,
    };

    this.handleJobsFind = this.handleJobsFind.bind(this);
    this.handleSetViewJob = this.handleSetViewJob.bind(this);
  }

  public componentDidMount() {
    this.handleJobsFind();
  }

  public handleJobsFind() {
    const company = this.props.data.company;

    if (company && company.id) {
      this.setState({ isFetching: true });

      apiJob.find(company.id)
        .then(() => {
          this.setState({ isFetching: false });
        })
        .catch(() => {
          this.setState({ isFetching: false });
        });
    }
  }

  public handleSetViewJob(job: Job) {
    this.props.dispatch(appSetViewJob(job.id || ''));
  }

  public render() {
    return (
      <List
        loading={this.state.isFetching}
        itemLayout={'horizontal'}
        // loadMore={
        //   <div className={'list-job-load'}>
        //     {
        //       this.state.isFetching
        //         ? <Spin />
        //         : <Button onClick={() => {/**/}}>load more</Button>
        //     }
        //   </div>
        // }
        dataSource={this.props.data.jobs || []}
        locale={{ emptyText: 'No jobs found' }}
        renderItem={(job: any) => (
          <CardJobsListJobsItem
            key={job.id}
            job={job}
            isActive={job.id === this.props.app.jobId}
            onClick={this.handleSetViewJob}
          />
        )}
      />
    );
  }
}

const mapStateToProps = (state: Store.State) => ({
  app: {
    jobId: state.app.jobId,
  },
  data: {
    company: state.data.companies && state.data.companies[0],
    jobs: state.data.jobs,
  },
})
export default connect(mapStateToProps)(CardJobsListJobs);
