
import React from 'react';
import PropTypes from 'prop-types';

export default class Message extends React.Component {
    static propTypes = {
        text: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired
    };

    state = {
        author: ''
    };

    componentWillMount(){
        this.state.author = this.props.author;
    };

    render() {
        return <div>{this.state.author + ': ' + this.props.text}</div>
    };
};