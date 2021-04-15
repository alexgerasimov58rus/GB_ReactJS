
import update from 'react-addons-update';
import {SEND_MESSAGE, ADD_CHAT, CHANGE_ACTIVITY, DELETE_CHAT} from "./actions";

const initialStore = {
    chats: {
        1: {title: 'Чат 1', messageList: [1], input: '', isActive: false},
        2: {title: 'Чат 2', messageList: [2], input: '', isActive: false},
        3: {title: 'Чат 3', messageList: [], input: '', isActive: false},
    },
    messages: {
        1: { text: "Привет!", author: 'Robot' },
        2: { text: "Здравствуйте!", author: 'Robot' },
    }
};

function deleteItem(chats, indexDelete) {
    let resChats = {};
    let currIndex = 1;
    Object.keys(chats).map(index => {
        if( index !== indexDelete){
            resChats[currIndex] = chats[index];
            currIndex++;
        }
    });

    return resChats;
}

export function chatsReducer(state = initialStore, action){
    switch (action.type) {
        case SEND_MESSAGE: {
            return update(state, {
                chats: { $merge: { [action.chatId]: {
                            title: state.chats[action.chatId].title,
                            messageList: [...state.chats[action.chatId].messageList,
                                action.messageId],
                            input: '',
                            isActive: state.chats[action.chatId].isActive
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
                            input: '',
                            isActive: false
                        } } },
            });
        case DELETE_CHAT:
            return {
                ...state,
                chats: deleteItem(state.chats, action.index)
            };
        case CHANGE_ACTIVITY:
            return update(state, {
                chats: { $merge: {
                        [action.chatId]: {
                            title: state.chats[action.chatId].title,
                            messageList: state.chats[action.chatId].messageList,
                            input: state.chats[action.chatId].input,
                            isActive: action.flag
                        } } },
            });

        default:
            return state;
    }
}


