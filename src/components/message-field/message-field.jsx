
import { Input, withStyles, InputAdornment } from "@material-ui/core"
import { Send } from "@material-ui/icons"
import {Message} from './message/message';
import styles from './message-field.module.css'
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
    state = {
        messages: [{
            text: "Привет! Как дела?",
            author: 'Robot'
        }],
        value: ""
    };

    sendMessage = (author, text) => {
        if( text.length === 0) return;
        const {messages} = this.state;
        this.setState({
            messages: [...messages, {author, text}],
            value: ""
        });
    };

    handleChangeInput = ({ target }) => {
        this.setState({
            value: target.value
        });
    };

    handlePressInput = ({ code }) => {
        const {value} = this.state;

        if (code === "Enter") {
            this.sendMessage("Me", value);
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {messages} = this.state;
        const lastMessage = messages[messages.length - 1];

        if( lastMessage.author !== 'Robot' && lastMessage.text === this.state.value) {
            setTimeout(() => {
                this.sendMessage('Robot', 'Не приставай ко мне, я робот')
                }, 1000);
        }
    };

    render() {
        const { messages, value } = this.state;

        const messageElements = messages.map((mess, index) => (
            <Message key={index} text={mess.text} author= {mess.author}/>));
        return <div className={styles.layout}>
            <div className={styles.messageField} >
                {messageElements}
            </div>
            <StyledInput
                fullWidth={true}
                value={value}
                onChange={this.handleChangeInput}
                onKeyPress={this.handlePressInput}
                placeholder="Введите сообщение..."
                endAdornment={
                    <InputAdornment position="end">
                        {value && (
                            <Send
                                className={styles.icon}
                                onClick={() => {
                                    this.sendMessage("Me", value);
                                }}
                            />
                        )}
                    </InputAdornment>
                }
            />
        </div>
    };
}
