import styled from "styled-components";
import logo from "../../assets/image/logo-gaja-white.png";
import opensea from "../../assets/image/opensea.svg";

const HeaderTag = styled.header`
  height: 100px;
  margin-bottom: 20px;
  /*background-color: #fff;
  background-color: rgba(255, 255, 255, 0.5);
  border-bottom: 2px solid #dadada;*/
  text-align: center;
  z-index: 99;
  position: relative;

    
  }
`;
const Logo = styled.img`
  max-width: 200px;
  position: absolute;
  left: 30px;
  top: 30px;
`;

const Icon = styled.img`
  width: 30px;
  position: absolute;
  right: 30px;
  top: 30px;
`;

const Header = () => {
  return (
    <HeaderTag>
      <Logo src={logo} />
      <a href="https://testnets.opensea.io/collection/gostar20" target="_blank">
        <Icon src={opensea} alt="opensea icon" />
      </a>
    </HeaderTag>
  );
};
export default Header;
