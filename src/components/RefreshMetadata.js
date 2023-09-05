import { useState } from "react";
import { contractAddress } from "../config";

const RefreshMetadata = ({ totalSupply }) => {
  const [isRrefreshing, setIsRefreshing] = useState(false);

  //const apiUrl = "https://api.opensea.io/api/v1/asset";//mainnet
  const apiUrl = "https://testnets-api.opensea.io/api/v1/asset/";
  const updateFlag = "/?force_update=true";

  function sleep(ms) {
    const wakeUpTime = Date.now() + ms;
    while (Date.now() < wakeUpTime) {}
  }
  //const array = [119, 234];
  const main = async () => {
    console.log("refresh start");
    setIsRefreshing(true);
    for (let i = 0; i < totalSupply; i++) {
      //for (let i = 0; i < array.length; i++) {
      const url = `${apiUrl}${contractAddress}/${i}${updateFlag}`;
      await fetch(url, {
        method: "GET",
      }).then((response) => console.log(`#${i} status ${response.status}`));
      sleep(800);
    }
    console.log("refresh end");
    setIsRefreshing(false);
  };

  return (
    <div>
      <h2>Refresh metadata</h2>
      <button onClick={main} disabled={isRrefreshing}>
        Refresh metadata
      </button>
      {isRrefreshing && <span>리프레시중...</span>}
    </div>
  );
};

export default RefreshMetadata;
