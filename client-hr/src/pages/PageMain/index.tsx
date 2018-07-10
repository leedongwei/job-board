import * as React from 'react';
import {
  connect,
  DispatchProp,
} from 'react-redux';

import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import Layout from 'antd/lib/layout';

import apiCompany from '../../api/v1/company';
import {
  dataSetCompanies,
  dataSetJobs,
} from '../../reducers/data/actions';

import TemplatePage from '../components/TemplatePage';
import CardJobs from './CardJobs';

interface IPageMainProps extends DispatchProp {
  data: {
    company: Company | undefined;
  }
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

  public componentDidMount() {
    apiCompany.find()
      .then((res) => {
        if (res.data.length > 0) {
          this.props.dispatch(dataSetCompanies(res.data));
          this.props.dispatch(dataSetJobs(res.data[0].jobs));
        }
      })
      .catch(err => console.error(err));
  }

  public render() {
    const company = this.props.data.company;

    return (
      <TemplatePage
        title={company ? company.name : 'HR Platform'}
      >
        <Layout>
          <Row gutter={12}>
            <Col span={8}>
              <CardJobs/>
            </Col>
            <Col span={16}>
              <div>create company</div>
            </Col>
          </Row>
        </Layout>
      </TemplatePage>
    )
  }
}

const mapStateToProps = (state: Store.State) => ({
  data: {
    company: state.data.companies && state.data.companies[0],
  },
})
export default connect(mapStateToProps)(PageMain);
