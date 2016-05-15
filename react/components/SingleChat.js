import React from 'react';

class SingleChat extends React.Component {
  render() {
    const { chatId } = this.props.params
    return (
      <h1>Single Chat: {chatId}</h1>
    );
  }
}

export default SingleChat;
