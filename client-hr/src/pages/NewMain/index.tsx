import * as React from 'react';
import {
  connect,
  DispatchProp,
} from 'react-redux';
import styled from 'styled-components';

// import apiCompany from '../../api/v1/company';
// import {
//   dataSetCompanies,
//   dataSetJobs,
// } from '../../reducers/data/actions';

import Button from 'antd/lib/button';
// import Col from 'antd/lib/grid/col';
// import Row from 'antd/lib/grid/row';
import Layout from 'antd/lib/layout';

import PageTemplate from '../components/PageTemplate';
import CallToAction from './CallToAction';
import HeroBanner from './HeroBanner';

const HeroText = styled.h1`
  font-size: 4rem;
  color: #FFF;
  z-index: 10;
  margin: 0 32px 40px;
  text-align: center;

  > span:first-child { font-weight: 300; }
  > span:last-child { font-weight: 700; }
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  width: 100vw;
  min-height: 50vh;
  margin: 32px 16px;
`;


interface IPageMainProps extends DispatchProp {
  data: {
    company: Company | undefined;
  }
}
interface IPageMainState {
  isFetching: boolean;
}

class PageMain extends React.Component<IPageMainProps, IPageMainState> {
  constructor(props: IPageMainProps) {
    super(props);

    this.state = {
      isFetching: true,
    };
  }

  public componentDidMount() {
    // apiCompany.find()
    //   .then((res) => {
    //     if (res.data.length > 0) {
    //       this.props.dispatch(dataSetCompanies(res.data));
    //       this.props.dispatch(dataSetJobs(res.data[0].jobs));
    //     }
    //   })
    //   .catch(err => console.error(err));
  }

  public render() {
    const company = this.props.data.company;

    return (
      <PageTemplate title={company ? company.name : 'HR Platform'}>
        <Layout>
          <HeroBanner>
            <HeroText>
              <span>Hire awesome </span>
              <span>hourly employees</span>
            </HeroText>

            <Button>
              Start hiring
            </Button>
          </HeroBanner>
          <ContentWrapper>
            <CallToAction/>

            <div>
              <div>jobs</div>
              <div>jobs</div>
              <div>jobs</div>
              <div>jobs</div>
              <div>jobs</div>
            </div>
          </ContentWrapper>
        </Layout>
      </PageTemplate>
    )
  }
}

const mapStateToProps = (state: Store.State) => ({
  data: {
    company: state.data.companies && state.data.companies[0],
  },
})
export default connect(mapStateToProps)(PageMain);
