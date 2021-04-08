
import { ADD_CHAT } from "./types"
import { SEND_MESSAGE } from "./types"

export const sendMessage = (messageId, text, author, chatId) => ({
    type: SEND_MESSAGE,
    messageId,
    text,
    author,
    chatId,
});

export const addChat = (title) => ({
    type: ADD_CHAT,
    title,
});