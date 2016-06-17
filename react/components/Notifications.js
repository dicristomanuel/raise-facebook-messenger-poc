import React, { Component } from 'react';

class Notifications extends Component {
  constructor(props) {
    super(props);
  }

  onClick(event) {
    console.log(event);
  }

  render() {
    return (
      <div className='bottom-notifications'>
        <div className='engaged-notifications'>
          <div className='engaged-single-container' onClick={this.onClick}>
            <div className='dot'></div>
            <div className='img-container'>
              <img src='https://scontent-ord1-1.xx.fbcdn.net/v/t1.0-9/12644987_10108074743261591_3874102557623315379_n.jpg?oh=a2f09797cad9436b5f3828cf079ede30&oe=58011884' className='xsm-image'/>
            </div>
          </div>
          <div className='engaged-single-container bounce' onClick={this.onClick}>
            <div className='dot'></div>
            <div className='img-container'>
              <img src='https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/12801477_685706248238148_6224624586905789762_n.jpg?oh=ca5e3916fdacd7b753c62ab02eb9b6fc&oe=57C37846' className='xsm-image'/>
            </div>
          </div>
        </div>

        <div className='notification-container notification-animation-in'>
          <div className='notification'>
            <p className='notification-text'>Chat engaged</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Notifications;
