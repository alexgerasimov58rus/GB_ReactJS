
import update from 'react-addons-update';
import {SEND_MESSAGE, ADD_CHAT, CHANGE_ACTIVITY, DELETE_CHAT} from "./actions";
import {GET_CHATS_PENDING, GET_CHATS_ERROR, GET_CHATS_SUCCESS} from "./actions";
import {GET_MESSAGES_ERROR, GET_MESSAGES_PENDING, GET_MESSAGES_SUCCESS} from "./actions";

const initialStore = {
    chats: {},
    messages: {},
    chatsPending: false,
    messagesPending: false,
    error: null
};

function deleteChat(chats, indexDelete) {
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

function deleteMessages(messages, indexDelete) {
    let resMessages = {};
    let currIndex = 1;
    Object.keys(messages).map(index => {
        if( index !== indexDelete){
            resMessages[currIndex] = messages[index];
            currIndex++;
        }
    });

    return resMessages;
}

export function chatsReducer(state = initialStore, action){
    switch (action.type) {
        case SEND_MESSAGE: {
            return update(state, {
                chats: { $merge: { [action.chatId]: {
                            title: state.chats[action.chatId].title,
                            input: '',
                            isActive: state.chats[action.chatId].isActive
                        } } },
                messages: { $merge: { [action.chatId]:
                    [...state.messages[action.chatId], {text: action.text, author: action.author}]
                }}
            });
        }
        case ADD_CHAT:
            const chatId = Object.keys(state.chats).length + 1;
            return update(state, {
                chats: { $merge: {
                        [chatId]: {
                            title: action.title,
                            input: '',
                            isActive: false
                        } } },
                messages: { $merge: {
                        [chatId]: []
                    }}
            });
        case DELETE_CHAT:
            return {
                ...state,
                chats: deleteChat(state.chats, action.index),
                messages: deleteMessages(state.messages, action.index),
            };
        case CHANGE_ACTIVITY:
            return update(state, {
                chats: { $merge: {
                        [action.chatId]: {
                            title: state.chats[action.chatId].title,
                            input: state.chats[action.chatId].input,
                            isActive: action.flag
                        } } },
            });
        case GET_CHATS_PENDING:
            return {
                ...state,
                chatsPending: true
            };
        case GET_CHATS_SUCCESS:
            return {
                ...state,
                chats: action.payload,
                chatsPending: false
            };
        case GET_CHATS_ERROR:
            return {
                ...state,
                chatsPending: false,
                error: null
            };
        case GET_MESSAGES_PENDING:
            return {
                ...state,
                messagesPending: true
            };
        case GET_MESSAGES_SUCCESS:
            return {
                ...state,
                messages:{
                    ...state.messages,
                    [action.id]: action.payload
                }
            };
        case GET_MESSAGES_ERROR:
            return {
                ...state,
                messagesPending: false,
                error: null
            };
        default:
            return state;
    }
}


