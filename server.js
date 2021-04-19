
const cors = require("cors");
const express = require("express");
const server = express();

server.use(cors());

const chats = {
    1: {title: 'Чат 1', input: '', isActive: false},
    2: {title: 'Чат 2', input: '', isActive: false},
    3: {title: 'Чат 3', input: '', isActive: false},
};

const messages = {
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

server.get("/", getChats);
server.get("/chat/:id", getChatMessages);

server.listen("8000", () => console.log("port 8000"));