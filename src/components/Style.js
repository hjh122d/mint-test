import styled, { css } from "styled-components";
import { Button } from "./Buttons/Button";

export const SpinnerContainer = styled.div`
  text-align: center;
  position: relative;

  img:first-child {
    position: absolute;
    top: 29.4px;
    left: 122px;
  }
  img:last-child {
    width: 80px;
  }
`;

export const ModalContainer = styled.div`
  ${Button} {
    margin-bottom: 24px;

    &: last-child {
      margin-bottom: 0;
    }
  }
`;

export const TextDiv = styled.div`
  text-align: center;
  margin-top: 15px;
`;
export const ErrorMessage = styled.div`
  color: red;
  margin-top: 5px;
`;

const backgroundColorStyle = css`
  ${(props) =>
    props.backgroundColor === "white" &&
    css`
      background-color: #ffffff;
    `}
  ${(props) =>
    props.backgroundColor === "black" &&
    css`
      background-color: #000000;
    `}
`;

const colorStyle = css`
  ${(props) =>
    props.color === "white" &&
    css`
      color: #ffffff;
    `}
  ${(props) =>
    props.color === "black" &&
    css`
      color: #000000;
    `}
`;

export const RoundBox = styled.div`
  border: 1px solid #000000;
  border-radius: 5px;
  display: inline-block;
  padding: 2px 5px;

  ${colorStyle}
  ${backgroundColorStyle}
`;

RoundBox.defaultProps = {
  backgroundColor: "#ffffff",
};

export const QuantityInput = styled.input`
  border: 1px solid #000000;
  background-color: #000000;
  color: #ffffff;
  text-align: center;
  padding: 4px;
  width: 40px;
  border-radius: 5px;
  margin: 0 3px;
`;

export const QuantityBox = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;

export const Progress = styled.div`
  width: 100%;
  height: 10px;
  background-color: #ffffff;
`;

export const Dealt = styled.div`
  background-color: #000000;
  width: ${(props) => props.dealt + "%"};
  height: 100%;
`;

export const SupplyBox = styled.div`
  display: flex;
  justify-content: space-between;

  margin-bottom: 5px;
`;
