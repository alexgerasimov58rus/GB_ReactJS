
export const ADD_CHAT = 'ADD_CHAT';
export const DELETE_CHAT = 'DELETE_CHAT';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const CHANGE_ACTIVITY = 'CHANGE_ACTIVITY';

export function sendMessage(messageId, text, author, chatId) {
    return {
        type: SEND_MESSAGE,
        messageId,
        text,
        author,
        chatId
    };
}

export function changeActivity(chatId, flag) {
    return {
        type: CHANGE_ACTIVITY,
        chatId,
        flag
    };
}

export function addChat(title) {
    return {
        type: ADD_CHAT,
        title
    };
}

export function deleteChat(index) {
    return {
        type: DELETE_CHAT,
        index
    };
}
