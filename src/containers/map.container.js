import { Container } from 'unstated';

import { getData } from '../api/map.api';

class MapContainer extends Container {
  state = {
    data: null,
    enableWeather: false,
    enableTraffic: false,
    enableFriction: false,
    enableLaserData: false,
    enableSpeedSigns: false,
    enablePlowTrucks: false,
    weather: null,
    traffic: null,
  };

  setEnable = (name) => {
    this.setState({[name]: !this.state[name]});
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