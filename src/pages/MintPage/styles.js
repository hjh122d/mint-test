import styled, { keyframes } from "styled-components";
import MintBg from "../../assets/image/bg.png";

const bgRolling = keyframes`
0%{background-position-x: 0px}
100%{background-position-x: calc(-100vh*4.92)}
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;
const Content = styled.div`
  margin: 0 auto;
  /*margin-top: calc(100vh / 5);*/
  padding: 20px;
  background-color: #fff;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 20px;
  width: 30%;
  min-width: 350px;
  max-width: 450px;
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
  Content,
  Background,
};

export default Styles;
