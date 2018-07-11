import * as React from 'react';

import Button from 'antd/lib/button';
import Card from 'antd/lib/card';
import message from 'antd/lib/message';

import CardApplicantsTableApplicants from './CardApplicantsTableApplicants';

const CardApplicants: React.SFC = () => (
  <Card
    title={'Applicants'}
    extra={(
      <Button
        type={'primary'}
        size={'small'}
        // onClick={() => this.handleToggleModal()}
        onClick={() => message.info('Not implemented')}
      >
        Compare
      </Button>
    )}
  >
    <CardApplicantsTableApplicants/>
  </Card>
);


export default CardApplicants;
