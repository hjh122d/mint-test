import styled, { keyframes } from "styled-components";
import MintBg from "../assets/image/bg.png";

const bgRolling = keyframes`
0%{background-position-x: 0px}
100%{background-position-x: calc(-100vh*4.92)}
`;

const Container = styled.div`
  min-height: 100vh;
  margin: 0;
  padding: 0;
`;
const Background = styled.div`
  background: url(${MintBg}) repeat-x top center/cover;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  animation: ${bgRolling} 30s linear infinite;
  z-index: -1;
`;

const Styles = {
  Container,
  Background,
};

export default Styles;
