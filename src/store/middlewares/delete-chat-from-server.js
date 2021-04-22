import {DELETE_CHAT} from "@app/store";
import {request} from "@app/api";

export const deleteChatFromServer =  () => next => (action) => {
    switch (action.type) {
        case DELETE_CHAT:
            request.delete("/chat/delete", {"id":action.chatId});
    }

    return next(action);
};