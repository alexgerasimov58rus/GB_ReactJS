import {ADD_CHAT} from "@app/store";
import {request} from "@app/api";

export const addChatToServer =  () => next => (action) => {
    switch (action.type) {
        case ADD_CHAT:
            request.delete("/chat/add", {"title":action.title});
    }

    return next(action);
};