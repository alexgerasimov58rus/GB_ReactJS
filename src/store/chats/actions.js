
export const ADD_CHAT = 'ADD_CHAT';
export const SEND_MESSAGE = "SEND_MESSAGE";

export function sendMessage(messageId, text, author, chatId) {
    return {
        type: SEND_MESSAGE,
        messageId,
        text,
        author,
        chatId
    };
}

export function addChat(title) {
    return {
        type: ADD_CHAT,
        title
    };
}