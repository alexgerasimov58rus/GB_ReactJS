import {SEND_MESSAGE} from "@app/store";
import {request} from "@app/api";

export const postMessageToServer =  () => next => (action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            request.post("/message/add", {"id": action.chatId, "text": action.text, "author": action.author});
    }

    return next(action);
};