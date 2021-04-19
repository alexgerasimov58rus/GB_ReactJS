
import { Input, withStyles, InputAdornment } from "@material-ui/core"
import { Send } from "@material-ui/icons"
import { Message } from './message/message';
import styles from './message-field.module.css'
import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getChats, sendMessage, getChatMessages} from "../../store"
import {bindActionCreators} from "redux";
import {push} from "connected-react-router";

const StyledInput = withStyles(() => {
    return {
        root: {
            "&": {
                color: "#9a9fa1",
                padding: "0px 5px",
                fontSize: "15px"
            }
        }
    }
})(Input);

class MessageField extends React.Component {
    static propTypes = {
        chatId: PropTypes.number.isRequired,
        messages: PropTypes.object.isRequired,
        chats: PropTypes.object.isRequired,
        sendMessage: PropTypes.func.isRequired,
        getChats: PropTypes.func.isRequired,
        getChatMessages: PropTypes.func.isRequired
    };

    sendMessage = (author, text) => {
        if( text.length === 0) return;
        const { chatId } = this.props;
        this.props.sendMessage(text, author, chatId);
    };

    handleChangeInput = ({ target }) => {
        const { chatId } = this.props;

        this.setState((prevState, prevProps) => {
            const chats = prevProps.chats;
            chats[chatId]['input'] = target.value;
            return{
                chats
            }
        });
    };

    handlePressInput = ({ code }) => {
        const { chats } = this.props;
        const { chatId } = this.props;

        if (code === "Enter") {
            this.sendMessage("Me", chats[chatId]['input']);
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if( prevProps.chatId !== this.props.chatId && this.props.messages[this.props.chatId] === undefined){
            this.props.getChatMessages(this.props.chatId);
        }
    }

    componentDidMount() {
        if( this.props.chatId > 0) {
            this.props.getChatMessages(this.props.chatId);
        }
    }

    render() {
        const { messages, chats } = this.props;
        const { chatId } = this.props;

        let messageElements = null;

        if( chatId === 0 || messages[chatId] === undefined || chats[chatId] === undefined){
            messageElements = '';
        }
        else {
            messageElements = messages[chatId].map((message, index) => (
                <Message
                    key={index}
                    text={message.text}
                    author= {message.author}/>));
        }

        return <div className={styles.layout}>
            <div className={styles.messageField} >
                {messageElements}
            </div>
            {(chatId !== 0 && chats[chatId] !== undefined) ?
                <StyledInput
                    enable="false"
                    fullWidth={true}
                    value={chats[chatId]['input']}
                    onChange={this.handleChangeInput}
                    onKeyPress={this.handlePressInput}
                    placeholder="Введите сообщение..."
                    endAdornment={
                        <InputAdornment position="end">
                            {chats[chatId]['input'] && (
                                <Send
                                    className={styles.icon}
                                    onClick={() => {
                                        this.sendMessage("Me", chats[chatId]['input']);
                                    }}
                                />
                            )}
                        </InputAdornment>
                    }
                /> : ''
            }
        </div>
    };
}

const mapStateToProps = ( state ) => {
    return {
        chats: state.chatsReducer.chats,
        messages: state.chatsReducer.messages
    };
};


const mapDispatchToProps = dispatch => bindActionCreators({ sendMessage, getChats, getChatMessages },
    dispatch);


export const VisibleMessageField = connect(
    mapStateToProps,
    mapDispatchToProps
)(MessageField);
