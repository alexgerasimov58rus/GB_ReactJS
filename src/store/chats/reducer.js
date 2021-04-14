
import update from 'react-addons-update';
import {SEND_MESSAGE, ADD_CHAT} from "./actions";

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

export function chatsReducer(state = initialStore, action){
    switch (action.type) {
        case SEND_MESSAGE: {
            return update(state, {
                chats: { $merge: { [action.chatId]: {
                            title: state.chats[action.chatId].title,
                            messageList: [...state.chats[action.chatId].messageList,
                                action.messageId],
                            input: '',
                        } } },
                messages: { $merge: { [action.messageId] : {
                            text: action.text,
                            author: action.author
                        } } }
            });
        }
        case ADD_CHAT:
            const chatId = Object.keys(state.chats).length + 1;
            return update(state, {
                chats: { $merge: {
                        [chatId]: {
                            title: action.title,
                            messageList: [],
                            input: ''
                        } } },
            });
        default:
            return state;
    }
}

