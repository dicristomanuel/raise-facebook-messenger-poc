import React, { PropTypes, Component } from 'react';

class Textarea extends Component {
  handleChange(event) {
    console.log(event);
    console.log(this);
  }

  render() {
    // let currentValue = this.state.currentValue.replace('\\n', '\n');
    return(
      <div className='input-container'>
        <textarea type="text"
          className='textarea'
          onChange={this.handleChange}
          />
      </div>
    )
  }
};

export default Textarea;
