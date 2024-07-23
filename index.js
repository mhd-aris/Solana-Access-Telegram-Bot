import { onMessage, onCallbackQuery } from "./services/telegram_services.js";
import {
  handleMessage,
  handleCallbackQuery,
} from "./handlers/message_handler.js";
import { checkGroupMembers } from "./utils/token_checker.js";
import { init } from "./storage/storage.js";
import config from "./config/config.js";

// Inisialisasi penyimpanan
init()
  .then(() => {
    console.log("Storage initialized");

    // Tangkap pesan yang masuk dan tangani
    onMessage(handleMessage);

    // Tangkap callback query yang masuk dan tangani
    onCallbackQuery(handleCallbackQuery);

    // Jadwalkan pengecekan saldo anggota grup setiap jam
    setInterval(checkGroupMembers, config.checkInterval);

    console.log("Bot is running...");
  })
  .catch((err) => {
    console.error("Failed to initialize storage:", err);
  });
