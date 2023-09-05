import { IconMetamask } from "../Buttons/MetamaskButton";
import Spinner from "../Spinner";
import Modal from "./Modal";
import { SpinnerContainer, TextDiv } from "../Style";

const MintingNowModal = ({ modalOpen, setModalOpen, modalHeader }) => {
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <Modal open={modalOpen} close={closeModal} header={modalHeader}>
      <SpinnerContainer>
        <IconMetamask />
        <Spinner />
      </SpinnerContainer>
      <TextDiv>Minting now</TextDiv>
    </Modal>
  );
};

export default MintingNowModal;
