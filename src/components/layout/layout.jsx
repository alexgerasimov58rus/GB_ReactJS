
import {Header} from '../header'
import {ChatList} from '../chat-list'
import {MessageField} from '../message-field'
import styles from './layout.module.css'

import React, { Component } from "react"

export class Layout extends Component {
    render() {
        return<div className={styles.layout}>
            <Header />
            <div className={styles.container}>
                <ChatList />
                <MessageField />
            </div>
        </div>
    }
}