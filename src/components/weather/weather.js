import React, { Component } from 'react';
import { Menu, Checkbox } from 'semantic-ui-react';

import WeatherStation from './weatherStation';

class Weather extends Component {

  async componentDidMount() {
    await this.props.mapContainer.getData('weather');
  }

  handleToggle = () => {
    this.props.mapContainer.setToggle('toggleWeather');
  };

  handleClick = (id) => {
    this.props.mapContainer.setTarget(id);
  };

  render() {
    const { toggleWeather, data } = this.props.mapContainer.state;

    const renderWeatherStations = () => {
      return <WeatherStation station={data} onClick={this.handleClick} />
    };

    return (
      <Menu vertical borderless size='huge'>
        <Menu.Item>
          <Checkbox toggle label='Enable' checked={toggleWeather === true} onClick={this.handleToggle} />
        </Menu.Item>
        <Menu.Item header>
          Weather
        </Menu.Item>
        {renderWeatherStations()}
      </Menu>
    );
  }
}

export default Weather;