
import {Header} from '../header'
import {ChatList} from '../chat-list'
import {MessageField} from '../message-field'
import styles from './layout.module.css'
import PropTypes from "prop-types";

import React, { Component } from "react"

export class Layout extends Component {
    static propTypes = {
        chatId: PropTypes.number.isRequired,
    };

    static defaultProps = {
        chatId: 0,
    };

    render() {
        return<div className={styles.layout}>
            <Header chatId={ this.props.chatId } />
            <div className={styles.container}>
                <ChatList />
                <MessageField chatId={ this.props.chatId } />
            </div>
        </div>
    }
}