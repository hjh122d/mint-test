import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { getContract } from "../utils/contract";
import styled from "styled-components";

const Ul = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  li {
    width: 20%;
    text-align: center;
  }
`;

const contract = getContract();
const MyNft = () => {
  const { account } = useWeb3React();
  const [tokenList, setTokenList] = useState([]);

  const getTokens = async () => {
    await contract.walletOfOwner(account).then((result) => {
      setTokenList(result);
    });
  };

  useEffect(() => {
    if (account) {
      getTokens();
    }
  }, [account]);
  return (
    <div>
      {account && tokenList.length > 0 && (
        <>
          <h2>My NFT</h2>
          <Ul>
            {tokenList.map((item) => {
              return <li key={item}>#{Number(item)}</li>;
            })}
          </Ul>
        </>
      )}
    </div>
  );
};

export default MyNft;
