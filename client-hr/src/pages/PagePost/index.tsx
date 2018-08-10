import * as React from 'react';
import DocumentTitle from 'react-document-title';
import {
  connect,
  DispatchProp,
} from 'react-redux';
import styled from 'styled-components';

import apiCompany from 'src/api/v1/company';
import apiJob from 'src/api/v1/job';
import { dataSetUserCompany } from 'src/reducers/data/actions';

import Col from 'antd/lib/col';
import Form from 'antd/lib/form';
import { FormComponentProps } from 'antd/lib/form/Form';
import Layout from 'antd/lib/layout';
import message from 'antd/lib/message';
import Row from 'antd/lib/row';

import Logo from '../components/Logo';
import FormCompany from './FormCompany';
import FormJob from './FormJob';

const Header = styled(Layout.Header)`
  width: 100%;
  text-align: center;
  border-bottom: 1px solid #ddd;
  background: none !important;
  z-index: 10;
`;
const Content = styled(Layout.Content)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;

  div.form-post { max-width: 475px; }
`

interface IPagePostProps extends FormComponentProps, DispatchProp {
  isVisible: boolean;
  user: User | undefined;
}
interface IPagePostState {
  isFetching: boolean;
  isUsingCreate: boolean;
  isVisible: boolean;
  company?: Company;
}

class PagePost extends React.Component<IPagePostProps, IPagePostState> {
  constructor(props: IPagePostProps) {
    super(props);

    this.state = {
      isFetching: true,
      isUsingCreate: false,
      isVisible: true,
    };

    this.fetchCompanyFind = this.fetchCompanyFind.bind(this);
    this.fetchCompanyCreate = this.fetchCompanyCreate.bind(this);
    this.fetchCompanyPatch = this.fetchCompanyPatch.bind(this);
    this.fetchJobCreate = this.fetchJobCreate.bind(this);
  }

  public componentDidMount() {
    this.fetchCompanyFind();
  }

  public fetchCompanyFind(): Promise<any> {
    return apiCompany.find()
      .then((res) => {
        this.props.dispatch(dataSetUserCompany(res.data));
        this.setState({ isFetching: false, company: res.data });
        return res;
      })
      .catch((err) => {
        this.setState({ isFetching: false });
      })
  }

  public fetchCompanyCreate(company: Company): Promise<any> {
    if (!this.props.user || !this.props.user.id) {
      message.error('You need to login to create a company')
      return Promise.reject('You need to login to create a company');
    }

    return apiCompany.create(company)
      .then((res) => {
        this.props.dispatch(dataSetUserCompany(res.data));
        this.setState({ company: res.data });
        return res;
      });
  }

  public fetchCompanyPatch(company: Company): Promise<any> {
    if (!this.props.user || !this.props.user.id || !this.state.company) {
      message.error('You need to login to create a company')
      return Promise.reject('You need to login to create a company');
    }

    return apiCompany.patch({ ...company, user_id: this.props.user.id });
  }

  public fetchJobCreate(job: Job): Promise<any> {
    if (!this.state.company || !this.state.company.id) {
      message.error('You need to save your company information')
      return Promise.reject('You need to save your company information');
    }

    return apiJob.create(this.state.company.id, job);
  }

  public render() {
    if (this.state.isFetching) {
      return <p>loading</p>;
    }

    return (
      <DocumentTitle title={'Post a job | got.work | Find and apply to hourly jobs'}>
        <Layout style={{ backgroundColor: '#FFF' }}>
          <Header>
            <Logo color={'#444'}/>
          </Header>

          <Content>
            <Row gutter={16} justify={'center'}>
              <Col xs={24} md={12}>
                <FormCompany
                  isVisible={true}
                  company={this.state.company}
                  fetchCompanyCreate={this.fetchCompanyCreate}
                  fetchCompanyPatch={this.fetchCompanyPatch}
                />
              </Col>

              {
                this.state.company &&
                <Col xs={24} md={12}>
                  <FormJob
                    isDisabled={!this.state.company}
                    company={this.state.company}
                    fetchJobCreate={this.fetchJobCreate}
                  />
                </Col>
              }
            </Row>
          </Content>
        </Layout>
      </DocumentTitle>
    );
  }
}

const mapStateToProps = (state: Store.State) => ({
  user: state.data.user,
});
export default connect(mapStateToProps)(Form.create()(PagePost));
