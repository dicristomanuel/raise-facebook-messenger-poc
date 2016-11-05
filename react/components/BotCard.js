import React, { PropTypes, Component } from 'react';

class BotCard extends Component {
  render() {
    const giftcards = JSON.parse(this.props.giftcards);
    return (
      <div className='giftcards-container'>
        {giftcards.map((giftcard, index) =>
          <div className='giftcard-single' key={index}>
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
