import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';

class Nav extends Component {
  state = {
    activeItem: this.props.location.pathname
  };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    this.redirectTo(name);
  };

  /**
   * Redirect to a given page
   */
  redirectTo = (path) => {
    this.props.history.push(path);
  };
  
  render() {
    const { activeItem } = this.state;

    return (
      <Menu>
        <Menu.Item name='/videos' active={activeItem === '/videos'} onClick={this.handleItemClick}>
          MP4
        </Menu.Item>

        <Menu.Item name='/traffic' active={activeItem === '/traffic'} onClick={this.handleItemClick}>
          Traffic
        </Menu.Item>

        <Menu.Item name='/plow-trucks' active={activeItem === '/plow-trucks'} onClick={this.handleItemClick}>
          Plow Trucks
        </Menu.Item>

        <Menu.Item name='/friction' active={activeItem === '/friction'} onClick={this.handleItemClick}>
          Friction
        </Menu.Item>

        <Menu.Item name='/' active={activeItem === '/'} onClick={this.handleItemClick}>
          Weather
        </Menu.Item>

        <Menu.Item name='/laser-data' active={activeItem === '/laser-data'} onClick={this.handleItemClick}>
          Laser Data
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(Nav);