import { atom } from "recoil";

export default atom({
  key: "MintingInfo",
  default: {
    mintCost: 0,
    maxSupply: 0,
    totalSupply: 0,
  },
});
