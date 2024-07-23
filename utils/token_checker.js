import { checkTokenBalance } from "../services/solana_service.js";
import {
  kickChatMember,
  getChatAdministrators,
  sendMessage,
} from "../services/telegram_services.js";
import config from "../config/config.js";

async function checkGroupMembers() {
  const members = await getChatAdministrators(config.groupChatId);

  for (const member of members) {
    const walletAddress = getWalletAddress(member.user.id); // Implementasi sesuai kebutuhan
    const balance = await checkTokenBalance(walletAddress);

    if (balance < config.minimumTokenAmount) {
      kickChatMember(config.groupChatId, member.user.id);
      sendMessage(
        member.user.id,
        "Anda telah dikeluarkan dari grup karena saldo token Anda tidak mencukupi."
      );
    }
  }
}

function getWalletAddress(userId) {
  // Implementasi untuk mendapatkan alamat wallet berdasarkan user ID
  // Misalnya dari database atau penyimpanan lokal
  return "user-wallet-address";
}

export { checkGroupMembers };
