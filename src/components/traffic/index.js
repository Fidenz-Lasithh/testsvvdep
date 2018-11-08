import React, { Component } from 'react';
import { Menu, Checkbox } from 'semantic-ui-react';

class Traffic extends Component {
  render() {
    return (
      <Menu vertical borderless size='huge'>
        <Menu.Item>
          <Checkbox toggle label='Enable' />
        </Menu.Item>
        <Menu.Item header>
          Traffic
        </Menu.Item>
        <Menu.Item>Traffic counting equipment 1</Menu.Item>
        <Menu.Item>Traffic counting equipment 2</Menu.Item>
        <Menu.Item>Traffic counting equipment 3</Menu.Item>
        <Menu.Item>Traffic counting equipment 4</Menu.Item>
        <Menu.Item>Traffic counting equipment 5</Menu.Item>
        <Menu.Item>Traffic counting equipment 6</Menu.Item>
      </Menu>
    );
  }
}

export default Traffic;