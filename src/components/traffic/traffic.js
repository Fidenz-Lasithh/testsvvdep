import React, { Component } from 'react';
import { Menu, Checkbox, Dimmer } from 'semantic-ui-react';

import TrafficEquipment from './trafficEquipment';

class Traffic extends Component {

  async componentWillMount() {
    await this.props.mapContainer.getData('traffic');
  }

  handleToggle = () => {
    this.props.mapContainer.setToggle('toggleTraffic');
  };

  handleClick = (id) => {
    this.props.mapContainer.setTarget(id);
  };
  
  render() {
    const { toggleTraffic, data, fetched } = this.props.mapContainer.state;

    const renderTrafficEquipment = () => {
      if (data) {
        return data.features.map((data) => {
          return <TrafficEquipment key={data._id} station={data} onClick={this.handleClick} />
        });
      }
    };

    return (
      fetched ? (
        <Menu vertical borderless size='huge'>
          <Menu.Item>
            <Checkbox toggle label='Enable' checked={toggleTraffic === true} onClick={this.handleToggle} />
          </Menu.Item>
          <Menu.Item header>
            Traffic
          </Menu.Item>
          {renderTrafficEquipment()}
        </Menu>
      ) : (
        <Dimmer active inverted />
      )
    );
  }
}

export default Traffic;