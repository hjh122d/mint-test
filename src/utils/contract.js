import { ethers } from "ethers";
import { contractAddress, contractAbi } from "../config";

export const getContract = () => {
  const provider = ethers.getDefaultProvider(
    process.env.REACT_APP_GOERLI_URL,
    "goerli"
  );
  const privateKey = process.env.REACT_APP_PRIVATE_KEY;
  const wallet = new ethers.Wallet(privateKey, provider);
  const contract = new ethers.Contract(contractAddress, contractAbi, wallet);
  return contract;
};
