
import {MessageField} from './components'
import './index.css'
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core';
import React, {Component} from 'react'
import ReactDom from 'react-dom'

const dark = {
};

const theme = createMuiTheme(dark);

ReactDom.render(
    <MuiThemeProvider theme = {theme}>
        <MessageField />
    </MuiThemeProvider>,
    document.querySelector("#root")
);
