
import styles from './header.module.css'
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';

import React, { Component } from "react"

export class Header extends Component {
    static propTypes = {
        chatId: PropTypes.number.isRequired
    };
    static defaultProps = {
        chatId: 0
    };

    render() {
        return <div className={styles.header}>
            {this.props.chatId ? <p> Чат {this.props.chatId} </p> : <p></p> }
            <Link to='/profile'>
                <p className={styles.chat}>Профиль</p>
            </Link>
        </div>
    }
}