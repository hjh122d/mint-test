import { useWeb3React } from "@web3-react/core";
import { useCallback, useEffect, useState } from "react";
import { Injected } from "../App";
import { getMerkleTree } from "../utils/merkleTree";
import { ConnectButton } from "./Buttons/Button";
import Modal from "./Modals/Modal";
import Spinner from "./Spinner";
import {
  MetamaskButton,
  DisconnectButton,
  SwitchButton,
  IconMetamask,
} from "./Buttons/MetamaskButton";

import { SpinnerContainer, ModalContainer, TextDiv } from "./Style";
const Wallet = ({ setIsWhitelist, setMerkleProof }) => {
  const { chainId, account, active, activate, deactivate, library } =
    useWeb3React();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalHeader, setModalHeader] = useState("");

  const openModal = useCallback(async () => {
    if (chainId === 5 || !account) {
      setModalHeader("Connect Wallet");
    } else {
      setModalHeader("Switch Networks");
    }
    setModalOpen(true);
  }, [account, chainId]);
  const closeModal = () => {
    setIsConnecting(false);
    setIsSwitching(false);
    setModalOpen(false);
  };

  //머클프룹 구하기
  const getMerkleProof = useCallback(
    async (address) => {
      let proof = [];
      const [merkleTree, keccak256] = await getMerkleTree();
      //console.log("account=> " + address);
      let hashedAddress = keccak256(address);
      proof = merkleTree.getHexProof(hashedAddress);
      setMerkleProof(proof);

      if (proof.length > 0) {
        //console.log("화리맞음");
        setIsWhitelist(true);
      } else {
        //console.log("화리아님");
        setIsWhitelist(false);
      }
    },
    [setIsWhitelist, setMerkleProof]
  );

  const handleConnect = async () => {
    setModalHeader("MetaMask");
    setIsConnecting(true);
    const metamaskAppDeepLink = `https://metamask.app.link/dapp/${window.location.host}`;
    if (window.ethereum === undefined) {
      window.open(metamaskAppDeepLink, "_blank");
      return;
    }
    if (active && account) {
      deactivate();
    }
    await activate(Injected, (error) => {
      console.log(error);
      if (error.code === -32002) {
        alert("펜딩중 요청 있음");
      } else if (error.code === 4001) {
        closeModal();
      } else {
        console.log(error);
      }
    });
    setIsConnecting(false);
  };

  const handleSwitchNetwork = async () => {
    try {
      setIsSwitching(true);
      await library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x5" }],
      });

      closeModal();
      setIsSwitching(false);
    } catch (error) {
      if (error.code === 4902) {
        console.error("This network is not found in your network!");
      } else if (error.code === -32002) {
        alert("펜딩중 요청 있음");
      } else if (error.code === 4001) {
        closeModal();
      } else {
        console.error("Failed to switch this network");
      }
    } finally {
    }
  };

  const handleDisconnect = () => {
    deactivate();
    closeModal();
  };

  useEffect(() => {
    if (account && setIsWhitelist) {
      getMerkleProof(account);
    }
  }, [account, getMerkleProof, setIsWhitelist]);

  useEffect(() => {
    if (chainId === 5) {
      closeModal();
    } else {
      if (account) {
        openModal();
      }
    }
  }, [chainId, account, openModal]);

  return (
    <div>
      <ConnectButton round="true" onClick={openModal}>
        {account
          ? `${account.substr(0, 6)}...${account.substr(38)}`
          : "Connect wallet"}
      </ConnectButton>
      {/* <div>Account : {account}</div> */}
      {/* <div>chainId : {chainId}</div> */}

      <Modal open={modalOpen} close={closeModal} header={modalHeader}>
        <ModalContainer>
          {isConnecting && (
            <>
              <SpinnerContainer>
                <IconMetamask />
                <Spinner />
              </SpinnerContainer>

              <TextDiv>REQUESTING CONNECTION</TextDiv>
            </>
          )}
          {chainId !== 5 && account && (
            <SwitchButton onClick={handleSwitchNetwork} pending={isSwitching}>
              Switch network
            </SwitchButton>
          )}
          {account && (
            <DisconnectButton onClick={handleDisconnect}>
              disconnect
            </DisconnectButton>
          )}
          {!account && !isConnecting && (
            <MetamaskButton onClick={handleConnect}>MetaMask</MetamaskButton>
          )}
        </ModalContainer>
      </Modal>
    </div>
  );
};
export default Wallet;
