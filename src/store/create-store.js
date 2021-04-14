import {combineReducers} from "redux";
import {chatsReducer} from "./chats"
import {profileReducer} from "./profile"
import { connectRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'

export const history = createBrowserHistory();

export const Reducers = combineReducers({
    router: connectRouter(history),
    chatsReducer,
    profileReducer
});