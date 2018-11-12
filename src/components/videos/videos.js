import React, { Component } from 'react';
import { Menu, Checkbox } from 'semantic-ui-react';

class Videos extends Component {

  handleClick = () => {
    this.props.mapContainer.setEnable('enableSpeedSigns');
  };

  render() {
    const { enableSpeedSigns } = this.props.mapContainer.state;

    return (
      <Menu vertical borderless size='huge'>
        <Menu.Item>
          <Checkbox toggle label='Enable' checked={enableSpeedSigns === true} onClick={this.handleClick} />
        </Menu.Item>
        <Menu.Item header>
          MP4
        </Menu.Item>
        <Menu.Item>Video 1</Menu.Item>
        <Menu.Item>Video 2</Menu.Item>
        <Menu.Item>Video 3</Menu.Item>
        <Menu.Item>Video 4</Menu.Item>
      </Menu>
    );
  }
}

export default Videos;