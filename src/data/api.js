import axios from "axios";

//whitelist
export async function getWhitelist() {
  return await axios.get("/api/whitelist");
}

export async function addWhitelist(formData) {
  return await axios.post("/api/whitelist", formData);
}

export async function deleteWhitelist(id) {
  return await axios.delete(`/api/whitelist/${id}`);
}

//airdrop
export async function getAirdropList() {
  return await axios.get("/api/airdrop");
}

export async function addAirdropList(formData) {
  return await axios.post("/api/airdrop", formData);
}

export async function updateAirdropList(list) {
  return await axios.put(`/api/airdrop`, list);
}

export async function deleteAirdropList(id) {
  return await axios.delete(`/api/airdrop/${id}`);
}
