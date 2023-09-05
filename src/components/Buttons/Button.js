import styled from "styled-components";
import Spinner from "../Spinner";

function BaseButton({ pending, children, ...props }) {
  return (
    <button {...props}>
      {children}
      {pending && <Spinner pending={pending} />}
    </button>
  );
}

export const Button = styled(BaseButton)`
  background-color: #f6f6f6;
  font-size: 16px;
  border: none;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: ${({ round }) => (round ? `9999px` : `5px`)};
  font-family: "Atkinson Hyperlegible", sans-serif;
`;

export const ConnectButton = styled(Button)`
  border: 3px solid #358ffc;

  &:disabled {
    color: #000000;
  }
`;

export const MintButton = styled(Button)`
  border: 1px solid #358ffc;
  padding: 10px 15px;
  margin-top: 20px;
  background-color: #358ffc;
  color: #ffffff;
  width: 100%;
`;

export const QuantityButton = styled(Button)`
  padding: 2px 5px;
  border: 1px solid #000000;
  background-color: #ffffff;
`;
