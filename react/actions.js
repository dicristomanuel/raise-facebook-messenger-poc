import Socket from './helpers/socket';
import { GetChats, Transform } from './helpers/chatAllHelper';
import { GetMessages } from './helpers/singleChatHelper';

export const ADD_CHAT = 'ADD_CHAT';
export const ADD_CHATS = 'ADD_CHATS';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const ADD_MESSAGES = 'ADD_MESSAGES';
export const SET_CHAT_VISIBILITY_FILTER = 'SET_CHAT_VISIBILITY_FILTER';
export const SET_MESSAGES_VISIBILITY_FILTER = 'SET_MESSAGES_VISIBILITY_FILTER';
export const CHAT_UPDATE = 'CHAT_UPDATE';
export const ADD_MEMBER = 'ADD_MEMBER';
export const ADD_ENGAGED_CHAT = 'ADD_ENGAGED_CHAT';
export const REMOVE_ENGAGED_CHAT = 'REMOVE_ENGAGED_CHAT';
export const ADD_ACTIVE = 'ADD_ACTIVE';
export const REMOVE_ACTIVE = 'REMOVE_ACTIVE';
export const ADD_FLASH_MESSAGE = 'ADD_FLASH_MESSAGE';

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_ACTIVE: 'SHOW_ACTIVE',
  SHOW_BUSY: 'SHOW_BUSY',
  SHOW_SOLVED: 'SHOW_SOLVED',
  SHOW_ENGAGED: 'SHOW_ENGAGED'
};

export const AddChat = chat => {
  return { type: ADD_CHAT, chat };
};

export const AddChats = chats => {
  return { type: ADD_CHATS, chats };
};

export const AddMessage = (message) => {
  return { type: ADD_MESSAGE, message };
};

export const AddMessages = messages => {
  return { type: ADD_MESSAGES, messages };
};

export const SetChatVisibilityFilter = filter => {
  return { type: SET_CHAT_VISIBILITY_FILTER, filter };
};

export const SetMessagesVisibilityFilter = chatId => {
  return { type: SET_MESSAGES_VISIBILITY_FILTER, chatId };
};

export const UpdateStatus = data => {
  return { type: CHAT_UPDATE, ...data };
};

export const AddMemberService = data => {
  return { type: ADD_MEMBER, data };
}

export const AddEngagedChat = chatId => {
  return { type: ADD_ENGAGED_CHAT, chatId }
}

export const RemoveEngagedChat = chatId => {
  return { type: REMOVE_ENGAGED_CHAT, chatId }
}

export const AddActive = data => {
  return { type: ADD_ACTIVE, data }
}

export const RemoveActive = data => {
  return { type: REMOVE_ACTIVE, data }
}

export const AddFlashMessage = flashMessage => {
  return { type: ADD_FLASH_MESSAGE, flashMessage }
}

export const FetchChats = () => {
  return ({ socket, dispatch, getState }) => {
    GetChats()
    .then((data) => {
      if (Object.keys(data.msAuth).length > 1)
        dispatch(AddMemberService(data.msAuth))
      Socket.OnNewChat({ socket, dispatch, Transform });
      Socket.OnChatUpdate({ socket, dispatch });
      dispatch(InitNotifications(data.engagedChats));
      dispatch(AddChats(Transform(data.allChats)));
    })
  }
};

export const FetchMessages = (id, page = 50) => {
  return ({ dispatch }) => {
    GetMessages(id, page)
    .then((messages) => {
      dispatch(AddMessages(messages));
    })
  }
};

export const handleClickManifest = chatId => {
  return ({ socket, dispatch, getState }) => {
    Socket.OnMessage({chatId, socket, dispatch});
    dispatch(RemoveActive(chatId));
    dispatch(SetMessagesVisibilityFilter(chatId));
  };
}

export const HandleEngage = (chatId, current) => {
  return ({ socket, dispatch, getState }) => {
    if (current == 'none') {
      dispatch(AddEngagedChat(chatId))
      dispatch(AddFlashMessage('Chat Engaged'))
      Socket.OnNotification({ chatId, dispatch, socket, getState })
    } else {
      dispatch(RemoveEngagedChat(chatId))
      dispatch(AddFlashMessage('Chat Disengaged'))
      Socket.OffNotification(chatId, socket);
    }
  };
}

export const InitNotifications = chats => {
  return ({ socket, dispatch, getState }) => {
    chats.forEach(chat => {
      const chatId = chat.id;
      dispatch(AddEngagedChat(chatId))
      Socket.OnNotification({ chatId, dispatch, socket, getState })
    })
  }
}

export const ResetSingleChat = () => {
  return ({ socket, dispatch, getState }) => {
    let prevChatId = getState().messagesVisibilityFilter;
    Socket.OffMessage({chatId: prevChatId, socket, dispatch});
    dispatch(SetMessagesVisibilityFilter(0))
  }
};
