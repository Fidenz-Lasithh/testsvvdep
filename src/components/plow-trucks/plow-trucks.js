import React, { Component } from 'react';
import { Menu, Checkbox, Label } from 'semantic-ui-react';
import moment from 'moment';

import './index.css';

class PlowTrucks extends Component {

  async componentWillMount() {
    await this.props.mapContainer.getPlowTrucksData(moment(new Date()).format('YYYY/MM/DD HH:mm'));
  }
  
  handleClick = () => {
    this.props.mapContainer.setToggle('togglePlowTrucks');
  };

  render() {
    const { togglePlowTrucks } = this.props.mapContainer.state;

    return (
      <Menu vertical borderless size='huge'>
        <Menu.Item>
          <Checkbox toggle label='Enable' checked={togglePlowTrucks === true} onClick={this.handleClick} />
        </Menu.Item>
        <Menu.Item header>
          Plow Trucks
        </Menu.Item>
        <Menu.Item>
          Just cleared
          <Label color='green' size='massive' horizontal/>
        </Menu.Item>
        <Menu.Item>
          Cleared couple of hours ago
          <Label color='yellow' size='massive' horizontal/>
        </Menu.Item>
        <Menu.Item>
          Cleared more than a day ago
          <Label color='red' size='massive' horizontal/>
        </Menu.Item>
      </Menu>
    );
  }
}

export default PlowTrucks;