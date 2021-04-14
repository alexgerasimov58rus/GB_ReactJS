
import { SEND_MESSAGE, sendMessage, changeActivity } from "../chats"

export const botSendMessage =  (store) => next => (action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            if (action.author !== 'Robot') {
                setTimeout(() => store.dispatch(
                    sendMessage(Object.keys(store.getState().chatsReducer.messages).length + 1,
                        'Не приставай ко мне, я робот!', 'Robot', action.chatId)),
                    1000);
            }else{
                store.dispatch(changeActivity(action.chatId, true));
                setTimeout(() => store.dispatch(
                    changeActivity(action.chatId, false)),
                    600);
            }
    }

    return next(action);
};
