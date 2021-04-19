
import {VisibleHeader} from '../header'
import {VisibleChatList} from '../chat-list'
import {VisibleMessageField} from '../message-field'
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
            <VisibleHeader chatId={ this.props.chatId } />
            <div className={styles.container}>
                <VisibleChatList chatId={ this.props.chatId }/>
                <VisibleMessageField chatId={ this.props.chatId } />
            </div>
        </div>
    }
}
