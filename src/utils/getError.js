import { getParsedEthersError } from "@enzoferey/ethers-error-parser";

export const getError = (error) => {
  const parsedEthersError = getParsedEthersError(error);
  const errorCode = parsedEthersError.errorCode;
  console.log(error);
  let errorMessage;

  if (error.code === 4001) {
    errorMessage = "거래를 거부했습니다.";
  } else if (error.code === "INSUFFICIENT_FUNDS") {
    errorMessage = "잔액 부족";
  } else {
    if (errorCode === "REJECTED_TRANSACTION") {
      errorMessage = "거래를 거부 하셨습니다.";
    } else if (errorCode === "EXECUTION_REVERTED") {
      errorMessage = parsedEthersError.context;
    } else {
      errorMessage = parsedEthersError.context;
    }
  }
  return errorMessage;
};
