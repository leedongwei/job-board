import * as React from 'react';
import styled from 'styled-components';

const Wrapper = styled.tr`
  padding: 20px 5px;
  border-bottom: 1px solid #EFEFEF;

  &:hover { cursor: pointer; }
  &:last-child { border-bottom: none; }
`;
const Logo = styled.img`
  display: block;
  width: 60px;
  height: 60px;
  margin: 5px;
  border-radius: 5px;
  overflow: hidden;
  background-color: #F8F8F8;
`;

const JobName = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: #534540;
`;
const CompanyName = styled.span`
  font-weight: normal;
`;

const LocationName = styled.div`
  font-size: 16px;
`;

const Tag = styled.div`
  display: inline-block;
  color: #999;
  padding: 2px;
  margin: 0 2px;
  background-color: #F8F8F8;
  border: 1px solid #E8E8E8;
  border-radius: 5px;
`;

const Button = styled.a`
  color: #FFF;
  background-color: rgb(255,71,66);
  padding: 10px 25px;
  border-radius: 6px;

  &:hover {
    cursor: pointer;
    color: #FFF;
    background-color: rgba(255,71,66, 0.6);
  }
`;

interface IListJobsItemProps {
  job: Job;
}
interface IListJobsItemState {
  isJobDescriptionVisible: boolean;
}

class ListJobsItem extends React.Component<IListJobsItemProps, IListJobsItemState> {
  constructor(props: IListJobsItemProps) {
    super(props);

    this.state = {
      isJobDescriptionVisible: true,
    };

    this.handleToggleJd = this.handleToggleJd.bind(this);
  }

  public handleToggleJd() {
    this.setState({ isJobDescriptionVisible: !this.state.isJobDescriptionVisible });
  }

  public render() {
    const company = this.props.job.company;

    return (
      <>
        <Wrapper
          onClick={() => this.handleToggleJd()}
          style={{ borderBottom: this.state.isJobDescriptionVisible ? 'none' : '1px solid #EFEFEF' }}
        >
          <td style={{ padding: '0 10px' }}>
            <Logo src={''}/>
          </td>

          <td style={{ padding: '0 10px', minWidth: 150 }}>
            <JobName>{this.props.job.title}</JobName><br/>
            {
              company &&
              <CompanyName>{company.name}</CompanyName>
            }
          </td>


          <td style={{ padding: '0 10px' }}>
            <LocationName>{company ? `${company.city}, ${company.state}` : 'Unknown'}</LocationName>
          </td>

          <td style={{ padding: '0 10px' }}>
            {(JSON.parse(this.props.job.tags as string)).map((t: string, i: number) => <Tag key={i}>{t}</Tag>)}
          </td>

          <td style={{ padding: '0 10px' }}>
            <Button href={this.props.job.application_link}>Apply</Button>
          </td>
        </Wrapper>
        <Wrapper
          style={{ display: this.state.isJobDescriptionVisible ? 'table-row' : 'none' }}
          onClick={() => this.handleToggleJd()}
        >
          <td
            colSpan={999}
            style={{
              fontSize: 16,
              padding: '10px 20px 50px',
            }}
          >
            {this.props.job.description}
          </td>
        </Wrapper>
      </>
    );
  }
};

export default ListJobsItem;
