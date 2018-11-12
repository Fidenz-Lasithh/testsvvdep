import React, { Component } from 'react';
import { Menu, Checkbox } from 'semantic-ui-react';

class Weather extends Component {

  async componentDidMount() {
    await this.props.mapContainer.getData('weather');
  }

  handleClick = () => {
    this.props.mapContainer.setToggle('toggleWeather');
  };
  // TODO: Write a component to render weather stations
  render() {
    const { toggleWeather, weather } = this.props.mapContainer.state;

    // const renderWeatherStations = (weather) => {
    //   return weather.map((weatherObj) => {
    //     return <Menu.Item key={weatherObj.index}>Weather Station {weatherObj.index}</Menu.Item>
    //   });
    // };

    return (
      <Menu vertical borderless size='huge'>
        <Menu.Item>
          <Checkbox toggle label='Enable' checked={toggleWeather === true} onClick={this.handleClick} />
        </Menu.Item>
        <Menu.Item header>
          Weather
        </Menu.Item>
        <Menu.Item>Weather Station 1</Menu.Item>
        <Menu.Item>Weather Station 2</Menu.Item>
        <Menu.Item>Weather Station 3</Menu.Item>
        <Menu.Item>Weather Station 4</Menu.Item>
        <Menu.Item>Weather Station 5</Menu.Item>
        <Menu.Item>Weather Station 6</Menu.Item>
      </Menu>
    );
  }
}

export default Weather;