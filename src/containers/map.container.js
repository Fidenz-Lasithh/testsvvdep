import _ from 'lodash';
import { Container } from 'unstated';

import { getData, getWeatherStationData } from '../api/map.api';

class MapContainer extends Container {
  state = {
    data: null,
    storedData: null,
    mapData: null,
    toggleWeather: false,
    toggleTraffic: false,
    toggleFriction: false,
    toggleLaserData: false,
    toggleSpeedSigns: false,
    togglePlowTrucks: false,
    currentLocation: null,
    zoom: null,
    fetched: false,
    screen: null,
  };


  setToggle = (name) => {
    try {
      const tabName = name.slice(6).toLowerCase();

      this.setState(
        {[name]: !this.state[name]}, 
        () => {
          this.state[name] ? 
            this.addToMap(this.state.data, tabName) :
            this.removeFromMap(tabName);
        });
    } catch (error) {
      console.log(error);
    }
  };
  
  addToMap = (data, tabName) => {
    const { storedData } = this.state;
    let updatedData;
    
    try {
      updatedData = _.assign(storedData, {[tabName]: data});
      this.setState({storedData: updatedData});
    } catch (error) {
      console.log(error);
    }
  };
  
  removeFromMap = (tabName) => {
    const { storedData } = this.state;
    let updatedData;
    
    try {
      updatedData = _.omit(storedData, tabName);
      this.setState({storedData: updatedData});
    } catch (error) {
      console.log(error);
    }
  };

  // Function to combine data from current screen and from other enabled screens
  readMapData = async (component) => {
    const { storedData, data } = this.state;
    let mapData;
    
    // mapData = _.assignIn(storedData, )
    // if (!_.isEmpty(storedData)) {
    //   _.forIn(storedData, (d) => {
    //     mapData = _.concat(mapData, d);
    //   })
    // }

    // mapData = _.assign(mapData, data);

    // mapData = _.concat(mapData, data);
    // console.log(mapData);
    this.setState({mapData: data, fetched: true, screen: component});
  };

  setTarget = (id) => {
    const { mapData } = this.state;
    let target, location;

    try {
      target = _.find(mapData.features, {'_id': id});
      // if (_.isArray(mapData)) {
      // } else {
      //   target = mapData;
      // }
      location = target.geometry.coordinates;
      this.setState({currentLocation: location, zoom: [14]});
    } catch (error) {
      console.log(error);
    }
  };

  getData = async (component) => {
    let err, data;

    try {
      [err, data] = await getData(component);
      if (err) console.log(err);

      this.setState({data: data}, () => this.readMapData(component));
    } catch (error) {
      console.log(error);
    }
  };

  getWeatherStationData = async (stationName) => {
    let err, data;

    try {
      [err, data] = await getWeatherStationData(stationName);
      if (err) console.log(err);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
}

export default MapContainer;