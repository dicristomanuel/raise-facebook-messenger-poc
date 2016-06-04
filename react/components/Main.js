import React from 'react';
import Footer from './Footer';
import { LayoutInit } from './helpers/layoutHelper';
import VisibleChatList from '../containers/VisibleChatList';
import { Provider } from 'react-redux';
import Store from '../createStore';

LayoutInit()

const Main = () => (
  <Provider store={Store}>
    <div>
      <VisibleChatList />
      <Footer />
    </div>
  </Provider>
);
export default Main;


// import Store from './createStore';
// import { UpdateStatus, AddChat } from './actions';
// import { LayoutInit } from './components/helpers/layoutHelper';
// import { Chat_update, New_chat } from '../data/socketConstants';

// const socket = io();
// LayoutInit();
//
// socket.on(Chat_update, (data) => {
//   Store.dispatch(UpdateStatus(data));
//   console.log('CHAT UPDATE >>> ', Store.getState());
// });
//
// socket.on(New_chat, (chat) => {
//   Store.dispatch(AddChat(chat));
// });
//
// class Layout extends React.Component {
//   render() {
//     return (
//       <div>
//         <Header />
//           {this.props.children}
//           <Footer />
//       </div>
//     );
//   }
// }
//
// export default Layout;
// shouldn't have actions/store dependencies
// doesn't need to be a class - stateless anonymous component
// TODO: <Link to="page" activeClassName="test">page</Link>
