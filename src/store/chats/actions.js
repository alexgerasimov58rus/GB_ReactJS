import {request} from "@app/api";
import {SEND_MESSAGE, CHANGE_ACTIVITY, ADD_CHAT, DELETE_CHAT} from "@app/store/chats/types";
import {GET_MESSAGES_SUCCESS, GET_MESSAGES_ERROR, GET_MESSAGES_PENDING} from "@app/store/chats/types";
import {GET_CHATS_SUCCESS, GET_CHATS_PENDING, GET_CHATS_ERROR} from "@app/store/chats/types";


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