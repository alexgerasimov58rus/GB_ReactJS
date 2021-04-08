
import update from 'react-addons-update';
import {SEND_MESSAGE} from "../chats";
import {ADD_CHAT} from "../chats";

const initialStore = {
    chats: {
        1: {title: 'Чат 1', messageList: [1], input: ''},
        2: {title: 'Чат 2', messageList: [2], input: ''},
        3: {title: 'Чат 3', messageList: [], input: ''},
    },
    messages: {
        1: { text: "Привет!", author: 'Robot' },
        2: { text: "Здравствуйте!", author: 'Robot' },
    }
};

export const chatsReducer = (store = initialStore, action) => {
    switch (action.type) {
        case SEND_MESSAGE: {
            return update(store, {
                chats: { $merge: { [action.chatId]: {
                            title: store.chats[action.chatId].title,
                            input: '',
                            messageList: [...store.chats[action.chatId].messageList,
                                action.messageId]
                        } } },
                messages: { $merge: { [action.messageId] : {
                            text: action.text,
                            author: action.author
                        } } }
                    });
        }
        case ADD_CHAT: {
            const chatId = Object.keys(store.chats).length + 1;
            return update(store, {
                chats: { $merge: {
                        [chatId]: {
                            title: action.title, messageList: []
                        } } },
            });
        }
        default:
            return store;
    }
};