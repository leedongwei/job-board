import * as React from 'react';
import DocumentTitle from 'react-document-title';
import {
  connect,
  DispatchProp,
} from 'react-redux';
import { push } from 'react-router-redux';

import { appUnsetLogin } from '../../../reducers/app/actions';

import Button from 'antd/lib/button';
import Layout from 'antd/lib/layout';
import './styles.css';

interface ITemplatePageProps extends DispatchProp {
  title?: string;
  hideHeader?: boolean;
  centerElements?: boolean;
}

class TemplatePage extends React.Component<ITemplatePageProps> {
  public handleLogout() {
    window.localStorage.setItem('hr-jwt', '');
    this.props.dispatch(appUnsetLogin());
    this.props.dispatch(push('/'));
  }

  public render() {
    return (
      <DocumentTitle title={`${this.props.title} | HR Platform` || 'HR Platform'}>
        <Layout className={'template-page'}>
          {
            !this.props.hideHeader && (
              <Layout.Header>
                <div className={'header'}>
                  <h1 className={'header-title'}>{this.props.title || 'HR Platform'}</h1>

                  <Button
                    className={'header-button'}
                    onClick={() => this.handleLogout()}
                  >
                    Logout
                  </Button>
                </div>
              </Layout.Header>
            )
          }

          <Layout.Content className={this.props.centerElements ? 'flex-center' : ''}>
            {this.props.children}
          </Layout.Content>
        </Layout>
      </DocumentTitle>
    )
  }
}

export default connect()(TemplatePage);
