import { useCallback, useEffect, useState } from "react";
import { contractAddress, contractAbi } from "../config";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";

const Holders = () => {
  const { library } = useWeb3React();
  const [holdersNFT, setHoldersNFT] = useState({});
  const [totalSupply, setTotalSypply] = useState(0);

  // const runApp = async () => {
  //   await Moralis.start({
  //     apiKey:
  //       "XqVTiOH9sORd9yveFmpeYNk0Uh5HbXdfuUeIbpe6HCBggsTTM9UPYjYbg1lz3Zko",
  //     // ...and any other configuration
  //   });

  //   const address = "0xa4057dada9217a8e64ee7d469a5a7e7c40b7380f";

  //   const chain = EvmChain.ETHEREUM;

  //   const response = await Moralis.EvmApi.nft.getNFTOwners({
  //     address,
  //     chain,
  //   });

  //   console.log(response.toJSON());
  // };

  const getHolders = async () => {
    const signer = library.getSigner();
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);

    //const total = await contract.totalSupply();
    //setTotalSypply(parseInt(total));
    const obj = {};
    for (let i = 0; i < 10000; i++) {
      contract.ownerOf(i).then((result) => {
        console.log(`${i} => ${result}`);
        //owners.add(result);
        //setHolders(owners);
        //console.log(result);
        const isExisted = Object.keys(obj).includes(result);
        if (!isExisted) obj[result] = new Array();
        obj[result].push(i);
      });
    }
    contract
      .balanceOf("0x346a30c16f2910d6321690e796a7e4dc1718ed91", 4292)
      .then((result) => {
        console.log(result);
      });
    setTimeout(() => {
      console.log(obj);
      setHoldersNFT(obj);
    }, 3000);
  };

  // const consoleHolders = async () => {
  //   const signer = library.getSigner();
  //   const contract = new ethers.Contract(contractAddress, contractAbi, signer);

  //   const owners = Array.from(await getHolders());
  //   setHolders(owners);

  //   const tokens = [];
  //   owners.forEach(async (item) => {
  //     await contract.walletOfOwner(item).then((result) => {
  //       tokens.push(item);
  //     });
  //   });
  //   setHoldersNFT(tokens);

  //   console.log(tokens);
  // };

  useEffect(() => {
    //consoleHolders();
    //getHolders();
    // const obj = { abcde: [0, 1, 2, 5, 6], fgsed: [3, 4, 7], oesdf: [8, 9] };
    //setHoldersNFT(obj);
  }, []);
  return (
    <div>
      <h2>Holders</h2>
      <button onClick={getHolders}>가져오기</button>
      <div>totalSupply : {totalSupply}</div>
      {Object.keys(holdersNFT).length > 0 && (
        <table className="address-table">
          <thead>
            <tr>
              <td>주소</td>
              <td>수량</td>
              <td>Tokens</td>
            </tr>
          </thead>
          <tbody>
            {Object.keys(holdersNFT).map((key) => {
              return (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{holdersNFT[key].length}</td>
                  <td>
                    {holdersNFT[key].map((item, i) => {
                      return <span key={i}>#{item}, </span>;
                    })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Holders;
