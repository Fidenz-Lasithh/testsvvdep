import React, { Component } from 'react';
import { Menu, Checkbox, Dimmer } from 'semantic-ui-react';
import VideoComponent from './videoComponent';

class Videos extends Component {

  // async componentWillMount() {
  //   await this.props.mapContainer.getData('videos');
  // }
  constructor() {
    super();

    this.state = {
      popup: false
    }
  }
  
  handleToggle = () => {
    this.props.mapContainer.setToggle('toggleSpeedSigns');
  };

  handleClick = (data, {content}) => {
    if (content === 'Play video') {
      this.togglePopup();
      this.props.mapContainer.toggleVideoPlayer();
    }
  };

  togglePopup = () => {
    this.setState({popup: !this.state.popup}, () => console.log(this.state.popup));
  }
  
  render() {
    const { toggleSpeedSigns, mapData, fetched, showVideoPlayer } = this.props.mapContainer.state;
    const { popup } = this.state;

    const renderVideos = () => {
      return <VideoComponent onClick={this.handleClick} togglePopup={this.togglePopup} popup={popup} />
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