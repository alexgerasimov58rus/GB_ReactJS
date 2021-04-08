
import { Input, withStyles, InputAdornment } from "@material-ui/core"
import { Send } from "@material-ui/icons"
import {Message} from './message/message';
import styles from './message-field.module.css'
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import {addChat} from "../../store"

import React from 'react';

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

export class MessageField extends React.Component {
    static propTypes = {
        chatId: PropTypes.number.isRequired,
        chats: PropTypes.object.isRequired,
        messages: PropTypes.object.isRequired,
        addChat: PropTypes.func.isRequired
    };

    sendMessage = (author, text) => {
        if( text.length === 0) return;

        const {messages} = this.props;
        const { chatId } = this.props;

        const messageId = Object.keys(messages).length + 1;

        this.props.sendMessage(messageId, text, author, chatId);
    };

    handleChangeInput = ({ target }) => {
        const { chatId } = this.props;

        // this.setState((prevState, prevProps) => {
        //     const chats = prevProps.chats;
        //     chats[chatId]['input'] = target.value;
        //     return{
        //         chats
        //     }
        // });
    };

    handlePressInput = ({ code }) => {
        const { chats } = this.props;
        const { chatId } = this.props;

        if (code === "Enter") {
            this.sendMessage("Me", chats[chatId]['input']);
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {messages} = this.props;
        const lastMessage = Object.values(messages)[Object.values(messages).length - 1];

        if( lastMessage.author !== 'Robot' && Object.keys(prevState.messages).length < Object.keys(messages).length)  {
            setTimeout(() => {
                this.sendMessage('Robot', 'Не приставай ко мне, я робот')
                }, 1000);
        }
    };

    render() {
        const { messages, chats } = this.props;
        const { chatId } = this.props;

        console.log(this.props);

        let messageElements = null;

        if( chatId === 0){
            messageElements = '';
        }
        else {
            messageElements = chats[chatId].messageList.map((messageId, index) => (
                <Message
                    key={index}
                    text={messages[messageId].text}
                    author= {messages[messageId].author}/>));
        }

        return <div className={styles.layout}>
            <div className={styles.messageField} >
                {messageElements}
            </div>
            {chatId !== 0 ?
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

const mapStateToProps = ({ chatsReducer }) => ({
    chats: chatsReducer.chats,
    messages: chatsReducer.messages
});

const mapDispatchToProps = dispatch => bindActionCreators({ addChat },
    dispatch);

export const MessageList = connect(
    mapStateToProps,
    mapDispatchToProps,
)(MessageField);