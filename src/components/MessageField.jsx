import React from 'react';
import Message from './Message';

export default class MessageField extends React.Component {
    state = {
        messages: ["Привет!", "Как дела?"],
        author: 'Some'
    };
    handleClick = () => {
        this.setState({
            messages: [...this.state.messages, 'Нормально'],
            author: 'Alex'
        });
    };

    render() {
        const messageElements = this.state.messages.map((text, index) => (
            <Message key={index} text={text} author= {this.state.author}/>));
        return <div>
            {messageElements}
            <button onClick={this.handleClick}>Отправить сообщение</button>
        </div>
    };

    componentDidUpdate() {
        if( this.state.author !== 'Robot') {
            setTimeout(() =>
                this.setState(
                    {
                        messages: [...this.state.messages, 'Не приставай ко мне, я робот!'],
                        author: 'Robot'
                    }), 1000);
        }
    };
};
