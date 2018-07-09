import * as React from 'react';
import DocumentTitle from 'react-document-title';

import { Layout } from 'antd';
import './styles.css';

interface IPageProps {
  title?: string;
  centerElements?: boolean;
}

class Page extends React.Component<IPageProps> {
  public render() {
    return (
      <DocumentTitle title={`this.props.title | ${'HR Platform'}` || 'HR Platform'}>
        <Layout className={'page'}>
          <Layout.Content className={this.props.centerElements ? 'flexCenter' : ''}>
            {this.props.children}
          </Layout.Content>
        </Layout>
      </DocumentTitle>
    )
  }
}

export default Page;
