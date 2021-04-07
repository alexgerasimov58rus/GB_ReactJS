
import { List, ListItem, ListItemText } from "@material-ui/core"
import styles from './chat-list.module.css'
import { Link } from 'react-router-dom';
import React, { Component } from "react"

export class ChatList extends Component {
    state = {
        chats: ["Чат 1", "Чат 2", "Чат 3"],
        selectedIndex: -1,
    };

    handleListItemClick = (index) => {
        this.setState({ selectedIndex: index })
    };

    render() {
        const { chats, selectedIndex } = this.state;

        return (
            <div className={styles.chatList}>
                <List component="nav" aria-label="secondary mailbox folders">
                    {chats.map((chat, index) => (
                        <Link to = {`/chat/${index + 1}/`} key = {index}>
                            <ListItem button
                                selected={selectedIndex === index}
                                onClick = {() => {
                                    this.handleListItemClick(index);
                                }}
                            >
                                <ListItemText primary={chat} />
                            </ListItem>
                        </Link>
                    ))}
                </List>
            </div>
        )
    };
}