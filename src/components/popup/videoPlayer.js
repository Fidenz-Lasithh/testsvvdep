import React from 'react';
import { Embed, Modal } from 'semantic-ui-react';

export default (props) => {
  console.log(props);
  return (
    <Modal 
      open={props.mapContainer.state.showVideoPlayer} 
      closeIcon={true} 
      onClose={() => props.mapContainer.toggleVideoPlayer()}
      size={"small"}
      dimmer='inverted'
    >
      <Modal.Content>
        <Embed 
          className="video-player"
          url={'https://www.youtube.com/watch?v=QnnNNjJWv8U'}
          autoplay={true}
        />
      </Modal.Content>
    </Modal>
  );
}
