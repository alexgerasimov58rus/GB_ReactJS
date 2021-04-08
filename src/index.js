
import {Router} from './components'
import './index.css'
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core';
import { Provider } from "react-redux"
import { store } from "./store"
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import React, {Component} from 'react'
import ReactDom from 'react-dom'

const dark = {
};

const theme = createMuiTheme(dark);

ReactDom.render(
    <BrowserRouter>
        <Provider store={store}>
            <MuiThemeProvider theme = {theme}>
                <Router />
            </MuiThemeProvider>
        </Provider>
    </BrowserRouter>,
    document.querySelector("#root")
);
