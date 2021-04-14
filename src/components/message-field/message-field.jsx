
import { Input, withStyles, InputAdornment } from "@material-ui/core"
import { Send } from "@material-ui/icons"
import { Message } from './message/message';
import styles from './message-field.module.css'
import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {sendMessage} from "../../store"

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
        chats: PropTypes.object.isRequired,
        messages: PropTypes.object.isRequired,
        sendMessage: PropTypes.func.isRequired
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
        const {messages} = this.props;
        const lastMessage = Object.values(messages)[Object.values(messages).length - 1];

        if( lastMessage.author !== 'Robot' && Object.keys(prevProps.messages).length < Object.keys(messages).length)  {
            setTimeout(() => {
                this.sendMessage('Robot', 'Не приставай ко мне, я робот')
                }, 1000);
        }
    };

    render() {
        const { messages, chats } = this.props;
        const { chatId } = this.props;

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

const mapStateToProps = ( state ) => {
    return {
        chats: state.chatsReducer.chats,
        messages: state.chatsReducer.messages
    };
};


const mapDispatchToProps = (dispatch) => ({
    sendMessage: (messageId, text, author, chatId) => dispatch(sendMessage(messageId, text, author, chatId)),
});


export const VisibleMessageField = connect(
    mapStateToProps,
    mapDispatchToProps
)(MessageField);
