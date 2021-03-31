import React from 'react';
import {Message} from './Message';

export class MessageField extends React.Component {
    state = {
        messages: [{
            text: "Привет!, Как дела?",
            author: 'Some'
        }],

    };
    handleClick = (author, text) => {
        const {messages} = this.state;

        this.setState({
            messages: [...messages, {author, text}]
        });
    };

    render() {
        const messageElements = this.state.messages.map((mess, index) => (
            <Message key={index} text={mess.text} author= {mess.author}/>));
        return <div>
            {messageElements}
            <button onClick={() => {
                this.handleClick('Alex', 'Нормально')
            }}>Отправить сообщение</button>
        </div>
    };

    componentDidUpdate() {
        const {messages} = this.state;
        const lastMessage = messages[messages.length - 1];

        if( lastMessage.author !== 'Robot') {
            setTimeout(() => {
                this.handleClick('Robot', 'Не приставай комне, я робот')
                }, 1000);
        }
    };
};
