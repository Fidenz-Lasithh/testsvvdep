import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react'

class Nav extends Component {
  state = {}

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
  };
  
  render() {
    const { activeItem } = this.state;

    return (
      <Menu>
        <Menu.Item name='mp4' active={activeItem === 'mp4'} onClick={this.handleItemClick}>
          MP4
        </Menu.Item>

        <Menu.Item name='traffic' active={activeItem === 'traffic'} onClick={this.handleItemClick}>
          Traffic
        </Menu.Item>

        <Menu.Item name='plow-trucks' active={activeItem === 'plow-trucks'} onClick={this.handleItemClick}>
          Plow Trucks
        </Menu.Item>

        <Menu.Item name='friction' active={activeItem === 'friction'} onClick={this.handleItemClick}>
          Friction
        </Menu.Item>

        <Menu.Item name='weather' active={activeItem === 'weather'} onClick={this.handleItemClick}>
          Weather
        </Menu.Item>

        <Menu.Item name='laser-data' active={activeItem === 'laser-data'} onClick={this.handleItemClick}>
          Laser Data
        </Menu.Item>
      </Menu>
    );
  }
}

export default Nav;