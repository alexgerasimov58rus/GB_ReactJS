
import {Router} from './components'
import './index.css'
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core';
import { Provider } from "react-redux"
import { BrowserRouter } from 'react-router-dom'
import React from 'react'
import ReactDom from 'react-dom'
import { createStore } from 'redux'
import { Reducers } from "./store";

const dark = {
};

const theme = createMuiTheme(dark);
const myStore = createStore(
    Reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ ?
    window.__REDUX_DEVTOOLS_EXTENSION__() : () => {},
);

ReactDom.render(
    <BrowserRouter>
        <Provider store={myStore}>
            <MuiThemeProvider theme = {theme}>
                <Router />
            </MuiThemeProvider>
        </Provider>
    </BrowserRouter>,
    document.querySelector("#root")
);
