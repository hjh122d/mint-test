import { MerkleTree } from "merkletreejs";
import { getWhitelist } from "../data/api";
import { ethers } from "ethers";

export const getMerkleTree = async () => {
  let whitelistArray = [];
  await getWhitelist().then((result) => {
    const data = result.data.data;
    data.forEach((item) => {
      whitelistArray.push(item.address);
    });
  });
  const whitelistLower = whitelistArray.map((v) => v.toLowerCase());
  const { keccak256 } = ethers;
  let leaves = whitelistLower.map((addr) => keccak256(addr));
  const merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true });
  return [merkleTree, keccak256];
};
