
import React, {Component} from 'react'
import ReactDom from 'react-dom'
import {MessageField} from './components/MessageField'

ReactDom.render(
    <>
        <MessageField />
    </>,
    document.querySelector("#root")
);
