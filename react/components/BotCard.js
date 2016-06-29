import React, { PropTypes, Component } from 'react';

class BotCard extends Component {
  render() {
    let id = 0;
    const giftcards = JSON.parse(this.props.giftcards);
    return (
      <div className='giftcards-container'>
        {giftcards.map(giftcard =>
          <div className='giftcard-single' key={id++}>
            <p className='giftcard-text'>
              {giftcard.title}
            </p>
            <div className='giftcard-image-container'>
              <img src={giftcard.image_url} className='giftcard-image'></img>
            </div>
            <p className='giftcard-text'>
              {giftcard.subtitle}
            </p>
          </div>
        )}
      </div>
    );
  }
}

BotCard.PropTypes = {
  giftcards: PropTypes.string.isRequired,
}

export default BotCard;
