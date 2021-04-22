
const cors = require("cors");
const bodyParser = require('body-parser');
const express = require("express");
const server = express();

server.use(cors());
server.use(bodyParser.json());

const chats = {
    1: {title: 'Чат 1', input: '', isActive: false},
    2: {title: 'Чат 2', input: '', isActive: false},
    3: {title: 'Чат 3', input: '', isActive: false},
};

let messages = {
    1: [{ text: "Привет!", author: 'Robot' }],
    2: [{ text: "Здравствуйте!", author: 'Robot' }],
};

const getChats = (request, response) => {
    response.status(200).send({"chats": chats});
};

const getChatMessages= (request, response) => {
    const {id} = request.params;
    response.status(200).send({"messages": messages[id] || [], "id": id});
};

const addChatMessage= (request, response) => {
    const {id, author, text} = request.body;
    messages[id] = [...messages[id], {"author": author, "text": text}];
    response.status(200).send("OK");
};

server.get("/", getChats);
server.get("/chat/:id", getChatMessages);
server.post("/message/add", addChatMessage);

server.listen("8000", () => console.log("port 8000"));