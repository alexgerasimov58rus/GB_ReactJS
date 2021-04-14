
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

const dark = {
};

const theme = createMuiTheme(dark);

const myStore = createStore(
    Reducers,
    compose(
        applyMiddleware(routerMiddleware(history), botSendMessage),
            window.__REDUX_DEVTOOLS_EXTENSION__ ?
            window.__REDUX_DEVTOOLS_EXTENSION__() : () => {}
    )
);

ReactDom.render(
    <Provider store={myStore}>
        <ConnectedRouter history={history}>
            <MuiThemeProvider theme = {theme}>
                <Router />
            </MuiThemeProvider>
        </ConnectedRouter>
    </Provider>,
    document.querySelector("#root")
);
