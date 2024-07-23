import TelegramBot from "node-telegram-bot-api";
import config from "../config/config.js";
import {
  setMinimumTokenAmount,
  setTokenMintAddress,
} from "../storage/storage.js";

const bot = new TelegramBot(config.telegramToken, { polling: true });

function sendMessage(chatId, text, options = {}) {
  return bot.sendMessage(chatId, text, options);
}

function kickChatMember(chatId, userId) {
  return bot.kickChatMember(chatId, userId);
}

function getChatAdministrators(chatId) {
  return bot.getChatAdministrators(chatId);
}

function onMessage(handler) {
  bot.on("message", handler);
}

function onCallbackQuery(handler) {
  bot.on("callback_query", handler);
}

function sendSettingsMenu(chatId) {
  const options = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "Set Token Amount", callback_data: "set_token_amount" },
          { text: "Set Token Mint Address", callback_data: "set_token_mint" },
        ],
      ],
    },
  };
  sendMessage(chatId, "Choose an option:", options);
}

export {
  sendMessage,
  kickChatMember,
  getChatAdministrators,
  onMessage,
  onCallbackQuery,
  sendSettingsMenu,
};
