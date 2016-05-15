import React from 'react';

class Chats extends React.Component {
  constructor() {
    super();
    this.age = 29;
    this.state = {name: 'Manuel'};
  }

  render() {
    setTimeout(() => {
      this.setState({name: 'Jack'});
    }, 2000);

    return (
      <div>
        <h1>Main Chats Page</h1>
        <h2>{this.state.name}</h2>
      </div>
    );
  }
}

export default Chats;
