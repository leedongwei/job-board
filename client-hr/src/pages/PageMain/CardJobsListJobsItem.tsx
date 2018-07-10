import * as React from 'react';

// import Button from 'antd/lib/button';
// import Card from 'antd/lib/card';
import Icon from 'antd/lib/icon';
import List from 'antd/lib/list';

import ModalJob from './ModalJob';
import './styles.css';

interface ICardJobsListJobsItemProps {
  job: Job;
}
interface ICardJobsListJobsItemState {
  showModal: boolean;
}

class CardJobsListJobsItem extends React.Component<ICardJobsListJobsItemProps, ICardJobsListJobsItemState> {
  constructor(props: ICardJobsListJobsItemProps) {
    super(props);

    this.state = {
      showModal: false,
    }

    this.handleToggleModal = this.handleToggleModal.bind(this);
  }

  public handleToggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  public render() {
    const job = this.props.job;

    return (
      <>
        <List.Item
          className={'list-job-item'}
          actions={[
            <a key={0} onClick={this.handleToggleModal}><Icon type={'edit'}/></a>,
          ]}
        >
          <List.Item.Meta
            title={<div className={'list-job-item-title'}>{job.title}</div>}
            description={<div className={'list-job-item-description'}>{job.description}</div>}
          />
        </List.Item>
        <ModalJob
          job={this.props.job}
          isVisible={this.state.showModal}
          toggleVisible={this.handleToggleModal}
        />
      </>
    );
  }
}

export default CardJobsListJobsItem;
