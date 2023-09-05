import { useState } from "react";
import useContract from "../hooks/useContract";
import {
  ErrorMessage,
  QuantityInput,
  QuantityBox,
  Progress,
  Dealt,
  SupplyBox,
} from "./Style";
import MintingNowModal from "./Modals/MintingNowModal";
import { MintButton, QuantityButton } from "./Buttons/Button";
import { Minus, Plus } from "../assets/FontAwesomeIcon";
import { useWeb3React } from "@web3-react/core";

const INITIAL_INPUTS = { mintAmount: 1, address: "" };
const INITIAL_DISABLED = { minus: true, plus: false };
const Mint = ({ title, mintFunc, mintingInfo, getMintingInfo }) => {
  const [isPending, contractError, mint] = useContract(mintContract);
  const [inputs, setInputs] = useState(INITIAL_INPUTS);
  const [modalOpen, setModalOpen] = useState(false);
  const [disabled, setDisabled] = useState(INITIAL_DISABLED);
  const { account } = useWeb3React();

  const changeDisabled = (type, disabled) => {
    setDisabled((prev) => ({
      ...prev,
      [type]: disabled,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let newMintAmount = value;

    if (newMintAmount > 0) {
      changeDisabled("minus", false);
    }
    if (newMintAmount >= 1) {
      changeDisabled("plus", false);
    }
    if (newMintAmount == 1) {
      changeDisabled("minus", true);
    }

    const nextInputs = {
      ...inputs,
      [name]: newMintAmount,
    };
    setInputs(nextInputs);
  };
  const handleInputBlur = (e) => {
    let newMintAmount = e.target.value;
    if (newMintAmount < 1) {
      newMintAmount = 1;
      changeDisabled("minus", true);
      changeDisabled("plus", false);
      alert("1개 이상부터 구매 가능합니다.");
    }
    if (newMintAmount >= mintingInfo.maxSupply - mintingInfo.totalSupply) {
      newMintAmount = mintingInfo.maxSupply - mintingInfo.totalSupply;
      changeDisabled("plus", true);
      alert("남은 수량은" + newMintAmount + "개 입니다.");
    }
    setInputs((prev) => ({
      ...prev,
      mintAmount: newMintAmount,
    }));
  };

  const handlePlus = () => {
    const newMintAmount = Number(inputs.mintAmount) + 1;
    changeDisabled("minus", false);
    setInputs((prev) => ({
      ...prev,
      mintAmount: newMintAmount,
    }));
    if (newMintAmount >= mintingInfo.maxSupply - mintingInfo.totalSupply) {
      changeDisabled("plus", true);
    }
  };
  const handleMinus = () => {
    const newMintAmount = Number(inputs.mintAmount) - 1;
    changeDisabled("plus", false);
    setInputs((prev) => ({
      ...prev,
      mintAmount: newMintAmount,
    }));
    if (newMintAmount <= 1) {
      changeDisabled("minus", true);
    }
  };

  async function mintContract() {
    return await mintFunc(inputs.mintAmount, inputs.address);
  }

  const handleMint = async () => {
    if (!account) {
      alert("지갑을 먼저 연결해주세요.");
    } else if (
      inputs.mintAmount < 1 ||
      inputs.mintAmount > mintingInfo.maxSupply - mintingInfo.totalSupply
    ) {
      alert("수량이 유효하지 않습니다.");
    } else {
      setModalOpen(true);
      await mint();
      await getMintingInfo();
      setModalOpen(false);
    }
  };

  const dealt = Math.floor(
    (mintingInfo.totalSupply / mintingInfo.maxSupply) * 100
  );

  return (
    <div>
      <h2>{title}</h2>
      {title === "Team mint" && (
        <>
          주소 :{" "}
          <input
            type="text"
            size="42"
            name="address"
            value={inputs.address}
            onChange={handleInputChange}
          />
          <br />
        </>
      )}
      <SupplyBox>
        <div>Supply :</div>
        <div>
          {mintingInfo.totalSupply} / {mintingInfo.maxSupply}
          {mintingInfo.totalSupply === mintingInfo.maxSupply && (
            <span> Sold out</span>
          )}
        </div>
      </SupplyBox>
      <Progress>
        <Dealt dealt={dealt} />
      </Progress>

      <QuantityBox>
        <div>Price : {mintingInfo.mintCost}ETH + Gas</div>
        <div>
          <QuantityButton onClick={handleMinus} disabled={disabled.minus}>
            <Minus />
          </QuantityButton>
          <QuantityInput
            type="number"
            value={inputs.mintAmount}
            name="mintAmount"
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            min="1"
            max={mintingInfo.maxSupply - mintingInfo.totalSupply}
          />
          <QuantityButton onClick={handlePlus} disabled={disabled.plus}>
            <Plus />
          </QuantityButton>
        </div>
      </QuantityBox>
      <MintButton
        onClick={handleMint}
        disabled={isPending || mintingInfo.totalSupply >= mintingInfo.maxSupply}
      >
        {mintingInfo.totalSupply < mintingInfo.maxSupply ? "Mint" : "Sold out"}
      </MintButton>
      {contractError && <ErrorMessage>{contractError}</ErrorMessage>}
      <MintingNowModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        modalHeader={title}
      />
    </div>
  );
};

export default Mint;
