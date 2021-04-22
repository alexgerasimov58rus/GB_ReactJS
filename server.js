
const cors = require("cors");
const bodyParser = require('body-parser');
const express = require("express");
const server = express();

server.use(cors());
server.use(bodyParser.json());

let chats = {
    1: {title: 'Чат 1', input: '', isActive: false},
    2: {title: 'Чат 2', input: '', isActive: false},
    3: {title: 'Чат 3', input: '', isActive: false},
};

let messages = {
    1: [{ text: "Привет!", author: 'Robot' }],
    2: [{ text: "Здравствуйте!", author: 'Robot' }],
    3: []
};

const getChats = (request, response) => {
    response.status(200).send({"chats": chats});
};

const getChatMessages= (request, response) => {
    const {id} = request.params;
    response.status(200).send({"messages": messages[id] || [], "id": id});
};

const addChatMessage = (request, response) => {
    const {id, author, text} = request.body;
    messages[id] = [...messages[id] || [], {"author": author, "text": text}];
    response.status(200).send("add message is OK");
};

const deleteChat = (request, response) => {
    const {id} = request.body;
    let resChats = {};
    let currIndex = 1;
    Object.keys(chats).map(index => {
        if( index !== id){
            resChats[currIndex] = chats[index];
            currIndex++;
        }
    });

    chats = resChats;

    let resMessages = {};
    currIndex = 1;

    Object.keys(messages).map(index => {
        if( index !== id){
            resMessages[currIndex] = messages[index];
            currIndex++;
        }
    });

    messages = resMessages;

    response.status(200).send("delete chat is OK");
};

const addChat = (request, response) => {
    const {title} = request.body;
    const id = Object.keys(chats).length + 1;
    chats[id]= {"title": title, "input": '', "isActive": false};
    messages[id] = [];
    response.status(200).send("add chat is OK");
};

server.get("/", getChats);
server.get("/chat/:id", getChatMessages);
server.post("/message/add", addChatMessage);
server.post("/chat/delete", deleteChat);
server.post("/chat/add", addChat);

server.listen("8000", () => console.log("port 8000"));