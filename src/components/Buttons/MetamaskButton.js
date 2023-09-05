import styled from "styled-components";
import metamaskLogoImg from "../../assets/image/Metamask-logo.svg";
import logoutImg from "../../assets/image/logout.svg";
import switchImg from "../../assets/image/switch.svg";
import { Button } from "./Button";

const Icon = styled.img`
  width: 24px;
`;

const StyledButton = styled(Button)`
  font-family: "Atkinson Hyperlegible", sans-serif;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: #444444;

  ${Icon} {
    margin-right: 10px;
  }
`;

export const IconMetamask = () => {
  return <Icon src={metamaskLogoImg} alt="Metamask logo" />;
};

export const MetamaskButton = ({ children, ...props }) => {
  return (
    <StyledButton {...props}>
      <IconMetamask />
      {children}
    </StyledButton>
  );
};

export const DisconnectButton = ({ children, ...props }) => {
  return (
    <StyledButton {...props}>
      <Icon src={logoutImg} alt="logout logo" />
      {children}
    </StyledButton>
  );
};

export const SwitchButton = ({ children, ...props }) => {
  return (
    <StyledButton {...props}>
      <Icon src={switchImg} alt="logout logo" />
      {children}
    </StyledButton>
  );
};
