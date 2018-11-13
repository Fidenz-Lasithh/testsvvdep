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
    data: null,
  };

  // TODO: Have the fetched data stored in state with component name as key
  // TODO: Logic to enable the map to read current fetched data and data held in the map object

  setToggle = (name) => {
    try {
      const stateName = name.slice(6).toLowerCase();

      this.setState(
        {[name]: !this.state[name]}, 
        () => {
          this.state[name] ? 
            this.addToMap(this.state[stateName], stateName) :
            this.removeFromMap(stateName);
        });
    } catch (error) {
      console.log(error);
    }
  };
  
  addToMap = (data, stateName) => {
    const { map } = this.state;
    let updatedMap;
    
    try {
      updatedMap = _.assign(map, {[stateName]: data});
      this.setState({map: updatedMap});
    } catch (error) {
      console.log(error);
    }
  };
  
  removeFromMap = (stateName) => {
    const { map } = this.state;
    let updatedMap;
    
    try {
      updatedMap = _.omit(map, stateName);
      this.setState({map: updatedMap});
    } catch (error) {
      console.log(error);
    }
  };

  getData = async (component) => {
    let err, data;

    try {
      [err, data] = await getData(component);
      if (err) console.log(err);

      this.setState({data: data});
    } catch (error) {
      console.log(error);
    }
  };

}

export default MapContainer;