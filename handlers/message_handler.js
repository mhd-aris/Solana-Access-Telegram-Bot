import { checkTokenBalance } from "../services/solana_service.js";
import {
  sendMessage,
  sendSettingsMenu,
} from "../services/telegram_services.js";
import { generateUniqueLink } from "../services/link_service.js";
import {
  getMinimumTokenAmount,
  getTokenMintAddress,
  setMinimumTokenAmount,
  setTokenMintAddress,
} from "../storage/storage.js";
import config from "../config/config.js";

async function handleMessage(msg) {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === "/settings") {
    sendSettingsMenu(chatId);
    return;
  }

  if (text.startsWith("Wallet:")) {
    const walletAddress = text.split("Wallet:")[1].trim();
    const tokenMintAddress = await getTokenMintAddress();
    const balance = await checkTokenBalance(walletAddress, tokenMintAddress);
    const minimumTokenAmount = await getMinimumTokenAmount();

    if (balance >= minimumTokenAmount) {
      const link = generateUniqueLink(chatId);
      sendMessage(
        chatId,
        `Validasi berhasil! Berikut adalah link unik Anda: ${link}`
      );
    } else {
      sendMessage(chatId, "Saldo token Anda tidak mencukupi.");
    }
  }
}

async function handleCallbackQuery(callbackQuery) {
  const chatId = callbackQuery.message.chat.id;
  const messageId = callbackQuery.message.message_id;
  const data = callbackQuery.data;

  if (data === "set_token_amount") {
    sendMessage(
      chatId,
      "Masukkan jumlah token minimum dalam format: /setamount <jumlah>"
    );
    return;
  }

  if (data === "set_token_mint") {
    sendMessage(
      chatId,
      "Masukkan token mint address dalam format: /setmint <address>"
    );
    return;
  }

  if (data.startsWith("setamount_")) {
    const amount = parseInt(data.split("setamount_")[1], 10);
    await setMinimumTokenAmount(amount);
    sendMessage(chatId, `Jumlah token minimum telah diatur menjadi ${amount}.`);
    bot.editMessageReplyMarkup(
      { inline_keyboard: [] },
      { chat_id: chatId, message_id: messageId }
    );
    return;
  }

  if (data.startsWith("setmint_")) {
    const address = data.split("setmint_")[1];
    await setTokenMintAddress(address);
    sendMessage(chatId, `Token mint address telah diatur menjadi ${address}.`);
    bot.editMessageReplyMarkup(
      { inline_keyboard: [] },
      { chat_id: chatId, message_id: messageId }
    );
    return;
  }
}

export { handleMessage, handleCallbackQuery };
