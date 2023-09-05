import styledComponents, { keyframes } from "styled-components";
import spinnerImg from "../assets/image/spinner.svg";

function BaseSpinner({ className }) {
  return <img className={className} src={spinnerImg} alt="spinner" />;
}

const rotate = keyframes`
    100% {
      transform: rotate(360deg);
    }
`;

const Spinner = styledComponents(BaseSpinner)`
  animation: ${rotate} .8s linear infinite;
  width: 24px;
  ${({ pending }) => pending && `margin-left:10px;`}
`;

export default Spinner;
