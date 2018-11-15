import React, { Component } from 'react';
import { Menu, Checkbox } from 'semantic-ui-react';

import TrafficEquipment from './trafficEquipment';

class Traffic extends Component {

  async componentDidMount() {
    await this.props.mapContainer.getData('traffic');
  }

  handleToggle = () => {
    this.props.mapContainer.setToggle('toggleTraffic');
  };

  handleClick = (id) => {
    this.props.mapContainer.setTarget(id);
  };
  
  render() {
    const { toggleTraffic, data } = this.props.mapContainer.state;

    const renderTrafficEquipment = () => {
      return <TrafficEquipment equipment={data} onClick={this.handleClick} />
    };

    return (
      <Menu vertical borderless size='huge'>
        <Menu.Item>
          <Checkbox toggle label='Enable' checked={toggleTraffic === true} onClick={this.handleToggle} />
        </Menu.Item>
        <Menu.Item header>
          Traffic
        </Menu.Item>
        {renderTrafficEquipment()}
      </Menu>
    );
  }
}

export default Traffic;