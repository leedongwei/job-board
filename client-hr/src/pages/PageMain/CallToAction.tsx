import * as React from 'react';
import {
  connect,
  DispatchProp,
} from 'react-redux';
import { push } from 'react-router-redux';
import styled from 'styled-components';

import Button from 'antd/lib/button';

const CallWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 85%;
  min-height: 50px;
  max-width: 650px;
  background-color: #FFFFDD;
  border-radius: 8px;
  margin: 32px 16px;
  padding: 8px 16px;
  text-align: center;

  > span { margin: 16px 0; }
  button { margin: 16px 0 16px 16px; }
`;
const TextBold = styled.span`
  font-weight: 700;
`;
const TextUnderline = styled.span`
  font-weight: 700;
  border-bottom: 1px solid;
`;

const CallToAction: React.SFC<DispatchProp> = (props) => (
  <CallWrapper>
    <span>Post a job on <TextBold>got.work</TextBold> — America's #1 spot for hourly work. <TextUnderline>It's FREE!</TextUnderline></span>
    <Button
      onClick={() => props.dispatch(push('/post'))}
      size={'large'}
    >
      Post a job
    </Button>
  </CallWrapper>
)

export default connect()(CallToAction);
