import { contractAddress, contractAbi } from "../config";
import { ethers } from "ethers";
import useContract from "../hooks/useContract";
import { ErrorMessage } from "./Style";
import { useWeb3React } from "@web3-react/core";

const MintStatusItem = ({ title, getStatus, status }) => {
  const { library } = useWeb3React();
  const [isPending, contractError, changeStatus] =
    useContract(setChangeContract);
  async function setChangeContract() {
    const signer = library.getSigner();
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);
    let result;
    if (title === "Public Mint paused") {
      result = await contract.setPaused(!status);
    } else if (title === "Whitelist mint enabled") {
      result = await contract.setWhitelistMintEnabled(!status);
    } else if (title === "revealed") {
      result = await contract.reveal(!status);
    }
    return result;
  }
  const clickHandler = async () => {
    await changeStatus();
    getStatus();
  };

  return (
    <div>
      {title} : {status.toString()}
      {/* <input
        type="radio"
        name={name}
        value={true}
        checked={selected}
        onChange={changeHandler}
      />
      true
      <input
        type="radio"
        name={name}
        value={false}
        checked={!selected}
        onChange={changeHandler}
      />
      false */}
      <button onClick={clickHandler} disabled={isPending}>
        {(!status).toString()}로 변경
      </button>
      {contractError && <ErrorMessage>{contractError}</ErrorMessage>}
      {isPending && <span>변경중...</span>}
    </div>
  );
};
export default MintStatusItem;
