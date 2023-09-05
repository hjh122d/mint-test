import Mint from "../../components/Mint";
import Wallet from "../../components/Wallet";
import { contractAddress, contractAbi } from "../../config";
import { useWeb3React } from "@web3-react/core";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import MintingInfoState from "../../state/MintingInfoState";
import { ethers } from "ethers";
import { getContract } from "../../utils/contract";
import MyNft from "../../components/MyNft";
import Styles from "./styles";

const whitelistStartDate = new Date("2023-8-31 3:11:00 UTC");
const publicStartDate = new Date("2023-8-10 3:11:30 UTC");

const MintPage = () => {
  const { account, library } = useWeb3React();
  const [isWhitelist, setIsWhitelist] = useState(false);
  const [merkleProof, setMerkleProof] = useState(null);
  const [mintingInfo, setMintingInfo] = useRecoilState(MintingInfoState);
  const [whitelistTime, setWhitelistTime] = useState(true);
  const [publicTime, setPublicTime] = useState(true);
  const [publicCountDown, setPublicCountDown] = useState(false);
  const [whitelistCountDown, setWhitelistCountDown] = useState(false);

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

  let showMint;
  //카운트다운 함수
  const countDownTimer = useCallback(
    (date, setCountDown) => {
      console.log("countDownTimer() 실행");
      const showRemaining = () => {
        const dueDate = date - new Date().getTime();

        if (dueDate < 0) {
          clearInterval(timer);
          showMint();
        }
        const secs = Math.floor((dueDate / 1000) % 60); // 초
        const mins = Math.floor((dueDate / (1000 * 60)) % 60); // 분
        const hours = Math.floor((dueDate / (1000 * 60 * 60)) % 24); // 시간
        const days = Math.floor(dueDate / (1000 * 60 * 60 * 24)); // 일
        //console.log(`${days}Day ${hours} : ${mins} : ${secs}`);
        setCountDown(`${days}Day ${hours} : ${mins} : ${secs}`);
      };

      const timer = setInterval(showRemaining, 1000);
    },
    [showMint]
  );

  //민트 화면 보이기
  showMint = useCallback(() => {
    //console.log("showMint()실행");
    const nowDate = new Date();
    const nowDateUTC = nowDate.toISOString();
    const whitelistStartDateUTC = whitelistStartDate.toISOString();
    const publicStartDateUTC = publicStartDate.toISOString();
    //민팅전
    if (nowDateUTC < whitelistStartDateUTC) {
      countDownTimer(whitelistStartDate, setWhitelistCountDown);
    }

    //화이트리스트
    if (nowDateUTC > whitelistStartDateUTC && nowDateUTC < publicStartDateUTC) {
      setWhitelistTime(true);
      countDownTimer(publicStartDate, setPublicCountDown);
    } else {
      setWhitelistTime(false);
    }

    //퍼블릭
    if (nowDateUTC > publicStartDateUTC) {
      setPublicTime(true);
    } else {
      setPublicTime(false);
    }
  }, [countDownTimer]);
  //public mint
  async function mint(mintAmount) {
    const signer = library.getSigner();
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);
    const cost = Number(ethers.parseUnits(mintingInfo.mintCost, "ether"));
    const result = await contract.mint(mintAmount, {
      from: account,
      value: String(mintAmount * cost),
    });
    return result;
  }

  //whitelist mint
  async function whitelistMint(mintAmount) {
    const signer = library.getSigner();
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);
    const cost = Number(ethers.parseUnits(mintingInfo.mintCost, "ether"));
    console.log(cost);
    const result = await contract.whitelistMint(mintAmount, merkleProof, {
      from: account,
      value: String(mintAmount * cost),
    });
    return result;
  }

  useEffect(() => {
    getMintingInfo();
    showMint();
  }, [getMintingInfo, showMint]);

  return (
    <Styles.Container>
      <Styles.Background />
      <Styles.Content>
        <Wallet
          setIsWhitelist={setIsWhitelist}
          setMerkleProof={setMerkleProof}
        />
        {!whitelistTime && !publicTime && (
          <div>화이트리스트 민트까지 {whitelistCountDown}</div>
        )}
        {/* {whitelistTime && isWhitelist && ( */}
        {whitelistTime && (
          <>
            퍼블릭민트까지{publicCountDown}
            <Mint
              title="White mint"
              mintFunc={whitelistMint}
              mintingInfo={mintingInfo}
              getMintingInfo={getMintingInfo}
            />
          </>
        )}
        {publicTime && (
          <Mint
            title="Public mint"
            mintFunc={mint}
            mintingInfo={mintingInfo}
            getMintingInfo={getMintingInfo}
          />
        )}
        <MyNft />
      </Styles.Content>
    </Styles.Container>
  );
};
export default MintPage;
