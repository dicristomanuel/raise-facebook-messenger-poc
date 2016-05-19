import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import store from './createStore';
import { AddChat } from './actions';

class Layout extends React.Component {
  render() {

    // socket.subscribe('initial_data', (data) => {
    //   data.forEach((element) => {
    //     store.dispatch(AddChat(element));
    //   });
    //   // console.log(store.getState());
    // });
    // socket.subscribe('NEW_CHAT_CLIENT', (data) => {
        // console.log(`>>>>>>>>>> IN LAYOUT <<<<<<<<<<<<`);
      // console.log(store.getState());
    // });
    // socket.unsubscribe(c1Token);

    return (
      <div>
        <Header />
          {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default Layout;

// TODO: <Link to="page" activeClassName="test">page</Link>
