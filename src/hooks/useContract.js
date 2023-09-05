import { useState } from "react";
import { getError } from "../utils/getError";
import { useWeb3React } from "@web3-react/core";

function useContract(contractFunction) {
  const { library } = useWeb3React();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  const wrappedFunction = async (...args) => {
    setError(null);
    try {
      const tx = await contractFunction(...args);
      setPending(true);
      const txHash = tx.hash;
      console.log("txHash=> " + txHash);
      await library.waitForTransaction(txHash);
      //setPending(false);
    } catch (error) {
      setError(getError(error));
    } finally {
      setPending(false);
    }
  };
  return [pending, error, wrappedFunction];
}

export default useContract;
