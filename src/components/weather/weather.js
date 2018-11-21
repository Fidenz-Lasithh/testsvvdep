import React, { Component } from 'react';
import { Menu, Checkbox, Dimmer } from 'semantic-ui-react';

import WeatherStation from './weatherStation';

class Weather extends Component {

  async componentWillMount() {
    await this.props.mapContainer.getData('weather');
  }

  handleToggle = () => {
    this.props.mapContainer.setToggle('toggleWeather');
  };

  handleClick = (id) => {
    this.props.mapContainer.setTarget(id);
  };

  render() {
    const { toggleWeather, data, fetched } = this.props.mapContainer.state;
    
    const renderWeatherStations = () => {
      if (data) {
        return data.features.map((data) => {
          return <WeatherStation key={data._id} station={data} onClick={this.handleClick} />
        });
      }
    };

    return (
      fetched ? (
        <Menu vertical borderless size='huge'>
          <Menu.Item>
            <Checkbox toggle label='Enable' checked={toggleWeather === true} onClick={this.handleToggle} />
          </Menu.Item>
          <Menu.Item header>
            Weather
          </Menu.Item>
          {renderWeatherStations()}
        </Menu>
      ) : (
        <Dimmer active inverted />
      )
    );
  }
}

export default Weather;