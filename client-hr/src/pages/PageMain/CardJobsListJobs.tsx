import * as React from 'react';
import {
  connect,
  DispatchProp,
} from 'react-redux';

import apiJob from '../../api/v1/job';

// import Button from 'antd/lib/button';
import List from 'antd/lib/list';
// import Spin from 'antd/lib/spin';

import CardJobsListJobsItem from './CardJobsListJobsItem';

interface ICardJobsListJobsProps extends DispatchProp {
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
  }

  public componentDidMount() {
    this.handleJobsFind();
  }

  public handleJobsFind() {
    this.setState({ isFetching: true });
    const company = this.props.data.company;

    if (company && company.id) {
      apiJob.find(company.id)
        .then(() => {
          this.setState({ isFetching: true });
        })
        .catch(() => {
          this.setState({ isFetching: true });
        });
    }
  }

  public render() {
    return (
      <List
        loading={false}
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
        renderItem={(job: any) => <CardJobsListJobsItem job={job}/>}
      />
    );
  }
}

const mapStateToProps = (state: Store.State) => ({
  data: {
    company: state.data.companies && state.data.companies[0],
    jobs: state.data.jobs,
  },
})
export default connect(mapStateToProps)(CardJobsListJobs);
