import * as React from 'react';

// import Button from 'antd/lib/button';
// import Card from 'antd/lib/card';
import Icon from 'antd/lib/icon';
import List from 'antd/lib/list';

import ModalJob from './ModalJob';
import './styles.css';

interface ICardJobsListJobsItemProps {
  job: Job;
  isActive: boolean;
  onClick?: { (job: Job): void };
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

    this.handleClick = this.handleClick.bind(this);
    this.handleToggleModal = this.handleToggleModal.bind(this);
  }

  public handleClick() {
    if (this.props.onClick) {
      this.props.onClick(this.props.job);
    }
  }

  public handleToggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  public render() {
    const job = this.props.job;

    return (
      <div onClick={this.handleClick}>
        <List.Item
          className={`list-job-item ${this.props.isActive && 'active'}`}
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
      </div>
    );
  }
}

export default CardJobsListJobsItem;
