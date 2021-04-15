
import {Router} from './components'
import './index.css'
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core';
import { Provider } from "react-redux"
import React from 'react'
import ReactDom from 'react-dom'
import {applyMiddleware, compose, createStore} from 'redux'
import { Reducers, botSendMessage, history } from "./store";
import { ConnectedRouter } from 'connected-react-router';
import { routerMiddleware } from 'connected-react-router'
import { persistReducer, persistStore } from "redux-persist"
import { PersistGate } from 'redux-persist/integration/react';
import storage from "redux-persist/lib/storage"
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const dark = {
};

const theme = createMuiTheme(dark);

const config = {
    key: "root",
    storage,
    stateReconciler: autoMergeLevel2,
    whitelist: ['chatsReducer', 'profileReducer']
};

const myStore = createStore(
    persistReducer(
        config,
        Reducers
    ),
    compose(
        applyMiddleware(routerMiddleware(history), botSendMessage),
            window.__REDUX_DEVTOOLS_EXTENSION__ ?
            window.__REDUX_DEVTOOLS_EXTENSION__() : () => {}
    )
);

const myPersistor = persistStore(myStore);

ReactDom.render(
    <Provider store={myStore}>
        <ConnectedRouter history={history}>
            <PersistGate persistor={myPersistor}>
                <MuiThemeProvider theme = {theme}>
                    <Router />
                </MuiThemeProvider>
            </PersistGate>
        </ConnectedRouter>
    </Provider>,
    document.querySelector("#root")
);
