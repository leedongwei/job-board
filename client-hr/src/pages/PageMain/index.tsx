import * as React from 'react';

import {
  Card,
} from 'antd';

import TemplatePage from '../components/TemplatePage';

interface IPageMainProps {
  nothing?: string;
}
interface IPageMainState {
  nothing?: boolean;
}

class PageMain extends React.Component<IPageMainProps, IPageMainState> {
  constructor(props: IPageMainProps) {
    super(props);

    this.state = {
    };
  }


  public render() {
    return (
      <TemplatePage
        title={'Login'}
        centerElements={true}
      >
        <Card style={{ width: 300 }}>
          <p>PAGEMAIN</p>
        </Card>
      </TemplatePage>
    )
  }
}

export default PageMain;
