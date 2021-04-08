
import { combineReducers, createStore } from "redux"
import { chatsReducer } from "./chats"

// @TODO добавить новый редюсер для профиля (без екшенов, любая информацию о пользователе)
const reducers = combineReducers({
    chatsReducer,
});

export const store = createStore(
    reducers
);