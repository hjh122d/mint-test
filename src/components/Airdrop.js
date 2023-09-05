import { ethers } from "ethers";
import { contractAddress, contractAbi } from "../config";
import { useCallback, useEffect, useState } from "react";
import {
  addAirdropList,
  getAirdropList,
  updateAirdropList,
  deleteAirdropList,
} from "../data/api";
import AddList from "./AddList";
import { ErrorMessage } from "./Style";
import { getError } from "../utils/getError";
import { useWeb3React } from "@web3-react/core";

const Airdrop = () => {
  const { library } = useWeb3React();
  const [isAirdropping, setIsAirdropping] = useState(false);
  const [airdropList, setAirdropList] = useState([]);
  const [contractError, setContractError] = useState(null);
  const [checkedIds, setCheckedIds] = useState([]);

  const checkHandler = (id, isChecked) => {
    if (isChecked) {
      setCheckedIds((prev) => [...prev, id]);
    } else if (!isChecked) {
      setCheckedIds(checkedIds.filter((el) => el !== id));
    }
  };

  const allCheckHandler = (checked) => {
    if (checked) {
      const idArray = [];
      airdropList.forEach((el) => {
        if (!el.isAirdrop) idArray.push(el.id);
      });
      setCheckedIds(idArray);
    } else {
      setCheckedIds([]);
    }
  };

  const airdropHandler = () => {
    const checkedAddress = [];
    checkedIds.forEach((el) => {
      const checkedRow = airdropList.filter((rowData) => rowData.id === el);
      checkedAddress.push(checkedRow[0].address);
    });

    airdrop(checkedIds, checkedAddress);
  };

  const handleDelete = async (id, e) => {
    e.preventDefault();
    const result = deleteAirdropList(id);
    if (!result) return;
    setAirdropList((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  //에어드롭 민트 버튼
  const airdrop = async (idList, addressList) => {
    const signer = library.getSigner();
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);
    setContractError(null);
    try {
      await contract.airdrop(addressList).then(async (tx) => {
        let txHash = tx.hash;
        setIsAirdropping(true);
        console.log(txHash);
        await library.waitForTransaction(txHash);
        setIsAirdropping(false);
      });

      await updateAirdropList(idList).then((result) => {
        //console.log(result.data);
        handleLoad();
      });
      setCheckedIds([]);
      idList.forEach((id) => {
        const addressId = "addressId" + id;
        console.log(addressId);
        document.getElementById(addressId).checked = false;
        console.log(document.getElementById(addressId));
      });
    } catch (error) {
      //errorAlert(error);
      setContractError(getError(error));
    }
  };

  const handleLoad = useCallback(() => {
    getAirdropList().then((result) => {
      let list = [];
      const data = result.data.data;
      //console.log(data);
      data.forEach((item) => {
        list.push(item);
      });
      setAirdropList(list);
      //console.log(list);
    });
  }, []);
  useEffect(() => {
    handleLoad();
  }, [handleLoad]);

  const addAirdropListSuccess = (address) => {
    setAirdropList((prevItems) => [address, ...prevItems]);
  };
  return (
    <div>
      <h2>Airdrop list</h2>

      <AddList
        onSubmit={addAirdropList}
        onSubmitSuccess={addAirdropListSuccess}
        listType="airdrop"
      />
      <div>
        <div>
          <input
            type="checkbox"
            name="selectAll"
            onChange={(e) => allCheckHandler(e.target.checked)}
            checked={
              checkedIds.length ===
              airdropList.filter((el) => !el.isAirdrop).length
                ? true
                : false
            }
          />{" "}
          전체선택
        </div>
        <table className="address-table">
          <thead>
            <tr>
              <td>선택</td>
              <td>종류</td>
              <td>주소</td>
              <td>지급여부</td>
              <td>삭제</td>
            </tr>
          </thead>
          <tbody>
            {airdropList &&
              airdropList.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>
                      <input
                        type="checkbox"
                        id={"addressId" + item.id}
                        onChange={(e) =>
                          checkHandler(item.id, e.target.checked)
                        }
                        checked={checkedIds.includes(item.id) ? true : false}
                        disabled={item.isAirdrop}
                      />
                    </td>
                    <td>{item.type}</td>
                    <td>{item.address}</td>
                    <td>{item.isAirdrop === 0 ? "미지급" : "지급완료"}</td>
                    <td>
                      <button
                        disabled={item.isAirdrop}
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

        <button onClick={airdropHandler} disabled={isAirdropping}>
          airdrop
        </button>
        {contractError && <ErrorMessage>{contractError}</ErrorMessage>}
        {isAirdropping && (
          <span>진행중...(진행중에는 새로고침이나 화면을 이동하지 마세요)</span>
        )}
      </div>
    </div>
  );
};

export default Airdrop;
