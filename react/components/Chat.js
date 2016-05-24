import React from 'react';
import Store from '../createStore';
import request from 'superagent';
import { UpdateStatus, AddMessage } from '../actions';
import { Chat_update } from '../../data/socketConstants';

const socket = io();

socket.on(Chat_update, (data) => {
  Store.dispatch(UpdateStatus(data));
  console.log(Store.getState());
});

const getMessages = (id) => {
  return new Promise((resolve, reject) => {
    request.get(`http://localhost:3001/get-messages/${id}`)
    .end((err, res) => {
      if (err)
      reject(err);
      else
      resolve(res.body);
    });
  });
};

class Chat extends React.Component {
  render() {
    const id = this.props.params.chatId;
    getMessages(id)
    .then((messages) => {
      messages.forEach((message) => {
        Store.dispatch(AddMessage(message));
      });
      console.log(Store.getState());
    });
    // socket.on new message for chatId
    return (
      <h3>
        {Store.chats[0]}
      </h3>
    );
  }
}

export default Chat;
