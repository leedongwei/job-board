import * as React from 'react';

import Button from 'antd/lib/button';
import Card from 'antd/lib/card';

import CardJobsListJobs from './CardJobsListJobs';
import ModalJob from './ModalJob';

interface ICardJobsState {
  showModal: boolean;
}

class CardJobs extends React.Component<{}, ICardJobsState> {
  constructor(props: {}) {
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
    return (
      <>
        <Card
          title={'Jobs'}
          extra={(
            <Button
              type={'primary'}
              size={'small'}
              onClick={() => this.handleToggleModal()}
            >
              Add new
            </Button>
          )}
        >
          <CardJobsListJobs/>
        </Card>
        <ModalJob
          isVisible={this.state.showModal}
          toggleVisible={this.handleToggleModal}
        />
      </>
    )
  }
}


export default CardJobs;
