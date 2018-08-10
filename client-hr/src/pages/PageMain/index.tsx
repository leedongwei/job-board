import * as React from 'react';
import {
  connect,
  DispatchProp,
} from 'react-redux';
import { push } from 'react-router-redux';
import styled from 'styled-components';

import apiJob from '../../api/v1/job';
import {
  dataSetCompanies,
  dataSetJobs,
} from '../../reducers/data/actions';

import Button from 'antd/lib/button';
// import Col from 'antd/lib/grid/col';
// import Row from 'antd/lib/grid/row';
import Layout from 'antd/lib/layout';

import PageTemplate from '../components/PageTemplate';
import mediaQuery from '../components/styledComponents/mediaQuery';
import CallToAction from './CallToAction';
import HeroBanner from './HeroBanner';
import ListJobsItem from './ListJobsItem';

const HeroText = styled.h1`
  font-size: 4rem;
  color: #FFF;
  z-index: 10;
  margin: 0 32px 40px;
  text-align: center;

  > span:first-child { font-weight: 200; }
  > span:last-child { font-weight: 600; }
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  width: 100vw;
  min-height: 50vh;
  margin: 32px 0px;

  ${mediaQuery.desktop`
    margin: 32px 16px;
  `}
`;
const ButtonCallToAction = styled.div`
  display: block;
  width: 130px;
  height: 45px;
  border: 2px solid #FFF;
  border-radius: 5px;

  background: rgba(30,30,30,.3);
  color: #fff;
  text-align: center;
  line-height: 40px;
  z-index: 10;

  &:hover {
    cursor: pointer;
    background: rgba(128,128,128,.3);
  }
`;

const TableJobs = styled.table`
  /* display: flex;
  flex-direction: column;
  flex-grow: 1; */
  width: 100%;
  max-width: 1000px;
  margin: 0.5em auto;
  margin-bottom: 3em;
  border-spacing: 0;
`;


interface IPageMainProps extends DispatchProp {
  data: {
    company: Company | undefined;
  }
}
interface IPageMainState {
  isFetching: boolean;
  jobs: Job[]
}

class PageMain extends React.Component<IPageMainProps, IPageMainState> {
  constructor(props: IPageMainProps) {
    super(props);

    this.state = {
      isFetching: true,
      jobs: [],
    };
  }

  public componentDidMount() {
    this.fetchJobFindLatest();
  }

  public fetchJobFindLatest() {
    return apiJob.findLatest()
      .then((res) => {
        console.log(res);
        this.setState({ jobs: res.data });
      });
  }

  public render() {
    const company = this.props.data.company;

    return (
      <PageTemplate title={company ? company.name : 'HR Platform'}>
        <Layout style={{ background: '#FFF' }}>
          <HeroBanner>
            <HeroText>
              <span>Hire awesome </span>
              <span>hourly employees</span>
            </HeroText>

            <ButtonCallToAction onClick={() => this.props.dispatch(push('/post'))}>
              Start hiring
            </ButtonCallToAction>
          </HeroBanner>
          <ContentWrapper>
            <CallToAction/>

            <TableJobs>
              <tbody>
                {this.state.jobs.map((j) => <ListJobsItem key={j.id} job={j} />)}
              </tbody>
            </TableJobs>
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
