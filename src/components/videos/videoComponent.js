import React, { Component } from 'react';
import { Embed, Grid, Popup, Button } from 'semantic-ui-react';

class VideoComponent extends Component {
  render() {
    const { onClick } = this.props;
    return (

        // <Embed 
        //   as={Dropdown}
        //   icon='play circle'
        //   item
        // >
        //   <Dropdown.Menu>
        //     <Dropdown.Item>Show speed signs</Dropdown.Item>
        //     <Dropdown.Item>Play video</Dropdown.Item>
        //   </Dropdown.Menu>
        // </Embed>

      <Popup wide trigger={<Embed icon='play circle' />} on='click' position='right center'>
        <Grid divided columns='equal'>
          <Grid.Column>
            <Popup
              trigger={<Button color='blue' content='Show speed signs' fluid />}
              position='top center'
              size='tiny'
              inverted
            />
          </Grid.Column>
          <Grid.Column>
            <Popup
              trigger={<Button color='red' content='Play video' fluid />}
              position='top center'
              size='tiny'
              inverted
            />
          </Grid.Column>
        </Grid>
      </Popup>
    );
  }
}

export default VideoComponent;