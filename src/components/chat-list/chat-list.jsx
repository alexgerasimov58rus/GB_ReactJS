
import {InputAdornment, List, ListItem, ListItemText, Input} from "@material-ui/core"
import {Add} from "@material-ui/icons"
import styles from './chat-list.module.css'
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import React, { Component } from "react"
import {addChat} from "@app/store";
import {connect} from "react-redux";

class ChatList extends Component {
    state = {
        input: ''
    };

    static propTypes = {
        chatId: PropTypes.number.isRequired,
        chats: PropTypes.object.isRequired,
        addChat: PropTypes.func.isRequired
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleKeyUp = (event) => {
        if (event.keyCode === 13) { // Enter
            this.handleAddChat();
        }
    };

    handleAddChat = () => {
        if (this.state.input.length > 0) {
            this.props.addChat(this.state.input);
            this.setState({ input: '' });
        }
    };

    render() {
        const { chats, chatId } = this.props;

        return (
            <div className={styles.chatList}>
                <List component="nav" aria-label="secondary mailbox folders">
                    {Object.keys(chats).map(index => (
                        <Link to = {`/chat/${index}/`} key = {index}>
                            <ListItem button
                                selected={ "" + chatId === index }
                            >
                                <ListItemText primary={chats[index].title} />
                            </ListItem>
                        </Link>
                    ))}
                    <ListItem
                        key="Add new chat"
                        style={ { height: '60px' } }
                        children= {<Input
                            key="textField"
                            fullWidth
                            name="input"
                            placeholder="Добавить новый чат"
                            onChange={ this.handleChange }
                            value={ this.state.input }
                            onKeyUp={ this.handleKeyUp }
                            endAdornment={
                                <InputAdornment position="end">
                                    {this.state.input && (
                                        <Add
                                            className={styles.icon}
                                            onClick={ this.handleAddChat }
                                        />
                                    )}
                                </InputAdornment>
                            }
                        />}
                    />
                </List>
            </div>
        )
    };
}

const mapStateToProps = ( state ) => {
    return {
        chats: state.chatsReducer.chats,
    };
};


const mapDispatchToProps = (dispatch) => ({
    addChat: (title) => dispatch(addChat(title)),
});


export const VisibleChatList = connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatList);
