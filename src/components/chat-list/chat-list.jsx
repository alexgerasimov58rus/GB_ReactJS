
import { List, ListItem, ListItemText } from "@material-ui/core"
import styles from './chat-list.module.css'
import React, { Component } from "react"

export class ChatList extends Component {
    state = {
        chats: ["room1", "room2", "room3"],
        selectedIndex: 0,
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
                        <ListItem button
                            key = {index}
                            selected={selectedIndex === index}
                            onClick = {() => {
                                this.handleListItemClick(index);
                            }}
                        >
                            <ListItemText primary={chat} />
                        </ListItem>
                    ))}
                </List>
            </div>
        )
    };
}