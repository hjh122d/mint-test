import { useCallback, useEffect, useState } from "react";
import { getContract } from "../utils/contract";
import MintStatusItem from "./MintStatusItem";

const INITIAL_STATUS = {
  paused: false,
  whitelistMintEnabled: false,
  revealed: false,
};

const contract = getContract();
const MintStatus = () => {
  const [status, setStatus] = useState(INITIAL_STATUS);
  const getStatus = useCallback(async () => {
    await contract.paused().then((result) => {
      setStatus((prev) => ({
        ...prev,
        paused: result,
      }));
    });
  }, []);
  const getStatus2 = useCallback(async () => {
    await contract.whitelistMintEnabled().then((result) => {
      setStatus((prev) => ({
        ...prev,
        whitelistMintEnabled: result,
      }));
    });
  }, []);
  const getStatus3 = useCallback(async () => {
    await contract.revealed().then((result) => {
      setStatus((prev) => ({
        ...prev,
        revealed: result,
      }));
    });
  }, []);

  useEffect(() => {
    getStatus();
    getStatus2();
    getStatus3();
  }, [getStatus, getStatus2, getStatus3]);

  return (
    <div>
      <h2>Mint Status</h2>
      <MintStatusItem
        title="Public Mint paused"
        name="setPaused"
        status={status.paused}
        getStatus={getStatus}
      />
      <MintStatusItem
        title="Whitelist mint enabled"
        name="setWhiteListMintEnabled"
        status={status.whitelistMintEnabled}
        getStatus={getStatus2}
      />
      <MintStatusItem
        title="revealed"
        name="reveal"
        status={status.revealed}
        getStatus={getStatus3}
      />
    </div>
  );
};

export default MintStatus;
