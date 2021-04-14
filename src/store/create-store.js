import {combineReducers} from "redux";
import {chatsReducer} from "./chats"
import {profileReducer} from "./profile"

export const Reducers = combineReducers({
    chatsReducer,
    profileReducer
});