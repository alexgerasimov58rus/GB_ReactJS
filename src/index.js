
import {Router} from './components'
import './index.css'
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import React, {Component} from 'react'
import ReactDom from 'react-dom'

const dark = {
};

const theme = createMuiTheme(dark);

ReactDom.render(
    <BrowserRouter>
        <MuiThemeProvider theme = {theme}>
            <Router />
        </MuiThemeProvider>
    </BrowserRouter>,
    document.querySelector("#root")
);
