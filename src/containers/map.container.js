import _ from 'lodash';
import { Container } from 'unstated';

import { getData } from '../api/map.api';

class MapContainer extends Container {
  state = {
    map: null,
    toggleWeather: false,
    toggleTraffic: false,
    toggleFriction: false,
    toggleLaserData: false,
    toggleSpeedSigns: false,
    togglePlowTrucks: false,
    weather: null,
    traffic: null,
  };

  setToggle = (name) => {
    const stateName = name.slice(6).toLowerCase();

    this.setState(
      {[name]: !this.state[name]}, 
      () => {
        this.state[name] ? 
          this.addToMap(this.state[stateName]) :
          this.removeFromMap(this.state[stateName]);
      });
  };

  addToMap = (data) => {
    const { map } = this.state;
    let updatedMap;

    if (!_.isEmpty(map)) {
      updatedMap = _.concat(map, data);
    } else {
      updatedMap = data;
    }

    this.setState({map: updatedMap}, () => {console.log(this.state.map)});
  };
  
  removeFromMap = (data) => {
    const { map } = this.state;
    let updatedMap;
    
    updatedMap = _.filter(map, data);
    this.setState({map: updatedMap}, () => {console.log(this.state.map)});
  };

  getData = async (component) => {
    try {
      let err, data;
      [err, data] = await getData(component);

      if (err) console.log(err);
      console.log(data);
      this.setState({[component]: data});
    } catch (err) {
      console.log(err);
    }
  };

}

export default MapContainer;