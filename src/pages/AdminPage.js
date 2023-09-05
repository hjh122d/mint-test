import Wallet from "../components/Wallet";
import { contractAddress, contractAbi } from "../config";
import { useWeb3React } from "@web3-react/core";
import Whitelist from "../components/Whitelist";
import Airdrop from "../components/Airdrop";
import Title from "../components/Title";
import { ethers } from "ethers";
import { useRecoilState } from "recoil";
import MintingInfoState from "../state/MintingInfoState";
import { getContract } from "../utils/contract";
import { useCallback, useEffect } from "react";
import Mint from "../components/Mint";
import MintCost from "../components/MintCost";
import MintStatus from "../components/MintStatus";
import RefreshMetadata from "../components/RefreshMetadata";
import Holders from "../components/Holders";

const AdminPage = () => {
  const { library } = useWeb3React();
  const [mintingInfo, setMintingInfo] = useRecoilState(MintingInfoState);
  //민팅정보 가져오기
  const getMintingInfo = useCallback(async () => {
    const contract = getContract();
    await contract.mintingInfo().then(function (result) {
      setMintingInfo((prevValues) => ({
        ...prevValues,
        mintCost: ethers.formatEther(result[0]),
        totalSupply: parseInt(result[1]),
        maxSupply: parseInt(result[2]),
      }));
    });
  }, [setMintingInfo]);

  useEffect(() => {
    getMintingInfo();
  }, [getMintingInfo]);

  //team mint
  const teamMint = async (mintAmount, address) => {
    const signer = library.getSigner();
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);
    const result = await contract.teamMint(address, mintAmount);

    return result;
  };

  return (
    <div>
      <Title>Admin page</Title>
      <Wallet />
      <Holders totalSupply={mintingInfo.totalSupply} />
      <MintCost
        mintCost={mintingInfo.mintCost}
        getMintingInfo={getMintingInfo}
      />
      <MintStatus />
      <Mint
        title="Team mint"
        mintingInfo={mintingInfo}
        getMintingInfo={getMintingInfo}
        mintFunc={teamMint}
      />
      <Whitelist />
      <Airdrop />
      <RefreshMetadata totalSupply={mintingInfo.totalSupply} />
    </div>
  );
};
export default AdminPage;
