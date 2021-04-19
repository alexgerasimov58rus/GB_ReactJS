import {request} from "@app/api";

export const ADD_CHAT = 'ADD_CHAT';
export const DELETE_CHAT = 'DELETE_CHAT';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const CHANGE_ACTIVITY = 'CHANGE_ACTIVITY';

export const GET_CHATS_PENDING = 'GET_CHATS_PENDING';
export const GET_CHATS_SUCCESS = 'GET_CHATS_SUCCESS';
export const GET_CHATS_ERROR = 'GET_CHATS_ERROR';

export const GET_MESSAGES_PENDING = 'GET_MESSAGES_PENDING';
export const GET_MESSAGES_SUCCESS = 'GET_MESSAGES_SUCCESS';
export const GET_MESSAGES_ERROR = 'GET_MESSAGES_ERROR';

export function sendMessage(text, author, chatId) {
    return {
        type: SEND_MESSAGE,
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

export const getChats = () => async(dispatch, getState, extraArguments) =>{
    dispatch({type: GET_CHATS_PENDING});
    try{
        const req = await request.get("");
        dispatch({type: GET_CHATS_SUCCESS, payload: req.data.chats});
    } catch {
        dispatch({type: GET_CHATS_ERROR });
    }
};

export const getChatMessages = (id) => async(dispatch, getState, extraArguments) =>{
    dispatch({type: GET_MESSAGES_PENDING});
    try{
        const req = await request.get(`/chat/${id}`);
        dispatch({type: GET_MESSAGES_SUCCESS, payload: req.data.messages, id: req.data.id});
    } catch {
        dispatch({type: GET_MESSAGES_ERROR });
    }
};