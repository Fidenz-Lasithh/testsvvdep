import React, { Component } from 'react';
import { Menu, Checkbox, Dimmer } from 'semantic-ui-react';
import VideoComponent from './videoComponent';

class Videos extends Component {

  // async componentWillMount() {
  //   await this.props.mapContainer.getData('videos');
  // }
  
  handleToggle = () => {
    this.props.mapContainer.setToggle('toggleSpeedSigns');
  };

  handleClick = () => {

  };
  
  render() {
    const { toggleSpeedSigns, mapData, fetched } = this.props.mapContainer.state;

    const renderVideos = () => {
      return <VideoComponent onClick={this.handleClick} />
      // return mapData.features.map((data) => {
      // });
    };

    return (
      // fetched ? (
        <Menu vertical borderless size='huge'>
          <Menu.Item>
            <Checkbox toggle label='Enable' checked={toggleSpeedSigns === true} onClick={this.handleClick} />
          </Menu.Item>
          <Menu.Item header>
            MP4
          </Menu.Item>
          {renderVideos()}
        </Menu>
      // ) : (
      //   <Dimmer active inverted />
      // )
    );
  }
}

export default Videos;