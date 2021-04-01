
import PropTypes from 'prop-types';
import styles from './message.module.css'
import React from 'react';

export class Message extends React.Component {
    static propTypes = {
        text: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired
    };

    render() {
        return <div
            className={styles.message}
            style={ { alignSelf: this.props.author === 'Robot' ?
                    'flex-start' : 'flex-end' } }
        >
            <div className={styles.messageAuthor}>
                {this.props.author}
            </div>
            <div>{this.props.text}</div>
        </div>
    };
};