import { useState } from "react";
import { ethers } from "ethers";
import useContract from "../hooks/useContract";
import { contractAddress, contractAbi } from "../config";
import { ErrorMessage } from "./Style";
import { useWeb3React } from "@web3-react/core";

const MintCost = ({ mintCost, getMintingInfo }) => {
  const { library } = useWeb3React();
  const [newMintCost, setNewMintCost] = useState(0);
  const [isPending, contractError, setCost] = useContract(setCostContract);
  async function setCostContract() {
    const signer = library.getSigner();
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);
    const weiCost = ethers.parseUnits(newMintCost, "ether");
    const result = await contract.setCost(weiCost);
    return result;
  }

  const inputHandler = (e) => {
    setNewMintCost(e.target.value);
  };

  const clickHandler = async () => {
    await setCost();
    setNewMintCost("");
    getMintingInfo();
  };
  return (
    <div>
      <h2>Mint cost</h2>
      <div>현재가격 : {mintCost} ETH</div>
      <input
        type="nubmer"
        name="mintCost"
        value={newMintCost}
        onChange={inputHandler}
      />
      <button onClick={clickHandler} disabled={isPending}>
        변경
      </button>
      {contractError && <ErrorMessage>{contractError}</ErrorMessage>}
      {isPending && <span>변경중...</span>}
    </div>
  );
};
export default MintCost;
