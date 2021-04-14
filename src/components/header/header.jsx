
import styles from './header.module.css'
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';

import React, { Component } from "react"
import {connect} from "react-redux";

class Header extends Component {
    static propTypes = {
        chatId: PropTypes.number.isRequired,
        login: PropTypes.string.isRequired
    };
    static defaultProps = {
        chatId: 0
    };

    render() {
        return <div className={styles.header}>
            {this.props.chatId ? <p> Чат {this.props.chatId} </p> : <p></p> }
            <Link to='/profile'>
                <p className={styles.chat}>{ this.props.login }</p>
            </Link>
        </div>
    }
}

const mapStateToProps = ( state ) => {
    return {
        login: state.profileReducer.login
    };
};

export const VisibleHeader = connect(
    mapStateToProps
)(Header);