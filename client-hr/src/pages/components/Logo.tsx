import * as React from 'react';
import styled from 'styled-components';

const LogoWrapper = styled.a`
  display: block;
  font-size: 36px;
  font-family: "Source Serif Pro", serif;
  color: ${(props) => (props.color || '#FFF')};
`;
const LogoGot = styled.span`
  font-family: "Source Sans Pro", sans-serif;
  font-weight: 200;
`;
const LogoWork = styled.span`
  font-weight: 700;
`;

interface ILogoProps {
  color?: string;
}

const Logo: React.SFC<ILogoProps> = (props) => (
  <LogoWrapper href={'/'} color={props.color}>
    <LogoGot>got</LogoGot>
    <LogoWork>.work</LogoWork>
  </LogoWrapper>
);

export default Logo;
