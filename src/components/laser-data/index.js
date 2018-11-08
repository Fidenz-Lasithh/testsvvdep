import React, { Component } from 'react';
import { Menu, Checkbox } from 'semantic-ui-react';

class LaserData extends Component {
  render() {
    return (
      <Menu vertical borderless size='huge'>
        <Menu.Item>
          <Checkbox toggle label='Enable' />
        </Menu.Item>
        <Menu.Item header>
          Laser Data
        </Menu.Item>
        <Menu.Item>Traffic sign 1</Menu.Item>
        <Menu.Item>Traffic sign 2</Menu.Item>
        <Menu.Item>Traffic sign 3</Menu.Item>
        <Menu.Item>Traffic sign 4</Menu.Item>
        <Menu.Item>Traffic sign 5</Menu.Item>
        <Menu.Item>Traffic sign 6</Menu.Item>
      </Menu>
    );
  }
}

export default LaserData;