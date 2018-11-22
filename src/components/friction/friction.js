import React, { Component } from 'react';
import { Menu, Checkbox, Label } from 'semantic-ui-react';
import moment from 'moment';

class Friction extends Component {

  async componentWillMount() {
    await this.props.mapContainer.getFrictionData(moment(new Date()).valueOf());
  }

  handleClick = () => {
    this.props.mapContainer.setToggle('toggleFriction');
  };

  render() {
    const { toggleFriction } = this.props.mapContainer.state;

    return (
      <Menu vertical borderless size='huge'>
        <Menu.Item>
          <Checkbox toggle label='Enable' checked={toggleFriction === true} onClick={this.handleClick} />
        </Menu.Item>
        <Menu.Item header>
          Friction
        </Menu.Item>
        <Menu.Item>
          Good friction
          <Label color='green' size='massive' horizontal/>
        </Menu.Item>
        <Menu.Item>
          Average friction
          <Label color='yellow' size='massive' horizontal/>
        </Menu.Item>
        <Menu.Item>
          Bad friction
          <Label color='red' size='massive' horizontal/>
        </Menu.Item>
      </Menu>
    );
  }
}

export default Friction;