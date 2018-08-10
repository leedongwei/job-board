import * as React from 'react';
import styled, { keyframes } from 'styled-components';

const HeroWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;
const HeroVideo = styled.video`
  position: absolute;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
`;
const HeroArrowMove = keyframes`
  0%, 100% {
    bottom: 0px;
  }
  50% {
    bottom: 6px;
  }
`;
const HeroArrow = styled.div`
  position: absolute;
  animation: ${HeroArrowMove} 1s ease infinite;
  bottom: 0;

  &:before,
  &:after {
    content: ' ';
    border-top: 8px solid #FFF;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
  }

  &:before {
    position: absolute;
    bottom: 8px;
  }
  &:after {
    position: absolute;
    bottom: 16px;
  }
`;
const HeroChildren = styled.div`
  display: flex;
  justify-content space-between;
  align-items: center;
  flex-direction: column;
`;

const HeroBanner: React.SFC = (props) => (
  <HeroWrapper>
    <HeroVideo
      autoPlay={true}
      playsinline={true}
      muted={true}
      loop={true}
      poster={'/assets/Hero-Video.jpg'}
    >
      <source src={'/assets/Hero-Video.mp4'} type={'video/mp4'}/>
      <source src={'/assets/Hero-Video.webm'} type={'video/webm'}/>
      <source src={'/assets/Hero-Video.ogv'} type={'video/ogv'}/>
    </HeroVideo>

    <HeroChildren>
      {props.children}
    </HeroChildren>

    <HeroArrow/>
  </HeroWrapper>
);


export default HeroBanner;
