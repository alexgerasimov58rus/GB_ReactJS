
import {InputAdornment, List, ListItem, ListItemText, Input} from "@material-ui/core"
import {Add} from "@material-ui/icons"
import styles from './chat-list.module.css'
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import React, { Component } from "react"
import {addChat} from "@app/store";
import {connect} from "react-redux";
import { push } from 'connected-react-router';

class ChatList extends Component {
    state = {
        input: ''
    };

    static propTypes = {
        chatId: PropTypes.number.isRequired,
        chats: PropTypes.object.isRequired,
        addChat: PropTypes.func.isRequired,
        push: PropTypes.func.isRequired,
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

    handleNavigate = (link) => {
        this.props.push(link);
    };

    render() {
        const { chats, chatId } = this.props;

        console.log(chats);

        return (
            <div className={styles.chatList}>
                <List component="nav" aria-label="secondary mailbox folders">
                    {Object.keys(chats).map(index => (
                        <div key = {index} className={chats[index].isActive ? styles.activity: ''}>
                            <ListItem button
                                key={ index }
                                onClick={ () => this.handleNavigate(`/chat/${index}`) }
                                selected={ "" + chatId === index }
                            >
                                <ListItemText primary={chats[index].title} />
                            </ListItem>
                        </div>
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

const mapDispatchToProps = dispatch => bindActionCreators({ addChat, push },
    dispatch);

export const VisibleChatList = connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatList);
