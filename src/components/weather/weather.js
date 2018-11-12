import React, { Component } from 'react';
import { Menu, Checkbox } from 'semantic-ui-react';

class Weather extends Component {

  handleClick = () => {
    this.props.mapContainer.setEnable('enableWeather');
  };
  
  render() {
    const { enableWeather } = this.props.mapContainer.state;

    return (
      <Menu vertical borderless size='huge'>
        <Menu.Item>
          <Checkbox toggle label='Enable' checked={enableWeather === true} onClick={this.handleClick} />
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