import { useCallback, useEffect, useState } from "react";
import useContract from "../hooks/useContract";
import { ethers } from "ethers";
import { contractAddress, contractAbi } from "../config";
import { useWeb3React } from "@web3-react/core";
import { getContract } from "../utils/contract";
import { getWhitelist, addWhitelist, deleteWhitelist } from "../data/api";
import { getMerkleTree } from "../utils/merkleTree";
import { ErrorMessage } from "./Style";
import AddList from "./AddList";

const Whitelist = () => {
  const { library } = useWeb3React();
  const [whitelist, setWhiteList] = useState([]);
  const [contractMerkleRoot, setContractMerkleRoot] = useState("");
  const [listMerkleRoot, setListMerkleRoot] = useState("");
  const [isPending, contractError, merkleRootUpdate] =
    useContract(updateContract);

  //컨트랙트 등록된 머클루트
  const getContractMerkleRoot = async () => {
    const contract = getContract();
    await contract.merkleRoot().then((result) => {
      setContractMerkleRoot(result);
    });
  };

  //현재 목록에 대한 머클루트
  const getListMerkleRoot = async () => {
    const [merkleTree] = await getMerkleTree();
    const merkleRootHash = merkleTree.getHexRoot();
    setListMerkleRoot(merkleRootHash);
    //console.log(merkleRootHash);
  };
  //머클루트 업데이트
  async function updateContract() {
    const signer = library.getSigner();
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);

    const result = await contract.setMerkleRoot(listMerkleRoot);
    return result;
  }
  //머클루트 업데이트 버튼
  const merkleRootUpdateHandler = async () => {
    await merkleRootUpdate();
    getContractMerkleRoot();
  };

  const addWhitelistSuccess = (address) => {
    setWhiteList((prevItems) => [address, ...prevItems]);
  };
  const handleDelete = async (id, e) => {
    e.preventDefault();
    const result = deleteWhitelist(id);
    if (!result) return;
    setWhiteList((prevItems) => prevItems.filter((item) => item.id !== id));
    getListMerkleRoot();
  };

  const handleLoad = useCallback(async () => {
    // await getWhitelist().then((result) => {
    //   let list = [];
    //   const data = result.data.data;
    //   data.forEach((item) => {
    //     list.push(item);
    //   });
    //   setWhiteList(list);
    // });
    
  }, [setWhiteList]);

  useEffect(() => {
    handleLoad();
    getContractMerkleRoot();
    getListMerkleRoot();
  }, [handleLoad]);

  return (
    <div>
      <h2>Whitelist</h2>
      <AddList
        onSubmit={addWhitelist}
        onSubmitSuccess={addWhitelistSuccess}
        getListMerkleRoot={getListMerkleRoot}
      />
      <table className="address-table">
        <thead>
          <tr>
            <td>주소</td>
            <td>삭제</td>
          </tr>
        </thead>
        <tbody>
          {whitelist &&
            whitelist.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.address}</td>
                  <td>
                    <button
                      onClick={(e) => {
                        handleDelete(item.id, e);
                      }}
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div>contract merkleRoot : {contractMerkleRoot}</div>
      <div>List merkleRoot : {listMerkleRoot}</div>
      <button onClick={merkleRootUpdateHandler} disabled={isPending}>
        update merkleProof
      </button>{" "}
      {contractError && <ErrorMessage>{contractError}</ErrorMessage>}
    </div>
  );
};

export default Whitelist;
