import { Connection, PublicKey } from "@solana/web3.js";
import config from "../config/config.js";

const connection = new Connection(config.solanaRpcUrl);

async function checkTokenBalance(walletAddress) {
  try {
    const publicKey = new PublicKey(walletAddress);
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
      publicKey,
      { mint: new PublicKey(config.tokenMintAddress) }
    );

    let balance = 0;
    tokenAccounts.value.forEach((account) => {
      balance += account.account.data.parsed.info.tokenAmount.uiAmount;
    });

    return balance;
  } catch (error) {
    console.error("Error checking token balance:", error);
    return 0;
  }
}

export { checkTokenBalance };
