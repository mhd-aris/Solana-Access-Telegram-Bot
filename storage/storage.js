import storage from "node-persist";

async function init() {
  await storage.init({ dir: "storage/data" });
}

async function getMinimumTokenAmount() {
  const amount = await storage.getItem("minimumTokenAmount");
  return amount !== undefined ? amount : 1000; // Default value
}

async function setMinimumTokenAmount(amount) {
  await storage.setItem("minimumTokenAmount", amount);
}

async function getTokenMintAddress() {
  const address = await storage.getItem("tokenMintAddress");
  return address !== undefined ? address : "DEFAULT_TOKEN_MINT_ADDRESS";
}

async function setTokenMintAddress(address) {
  await storage.setItem("tokenMintAddress", address);
}

export {
  init,
  getMinimumTokenAmount,
  setMinimumTokenAmount,
  getTokenMintAddress,
  setTokenMintAddress,
};
