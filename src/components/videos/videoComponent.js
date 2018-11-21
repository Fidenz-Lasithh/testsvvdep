import React, { Component } from 'react';
import { Embed, Popup, Button } from 'semantic-ui-react';

class VideoComponent extends Component {
  render() {
    const { onClick, togglePopup, popup } = this.props;
    return (
      <Popup 
        open={popup}
        onOpen={togglePopup}
        trigger={<Embed icon='play circle' />} 
        on='click' 
        position='right center'
      >
        <Button content='Show speed signs' fluid onClick={onClick} />
        <Button content='Play video' fluid onClick={onClick} />
      </Popup>
    );
  }
}

export default VideoComponent;