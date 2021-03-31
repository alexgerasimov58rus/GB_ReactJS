
import React from 'react';
import PropTypes from 'prop-types';

export class Message extends React.Component {
    static propTypes = {
        text: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired
    };

    render() {
        return <div>{this.props.author + ': ' + this.props.text}</div>
    };
};