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
  };

  //TODO: the enable feature needs to be set for each nav tab and applied to the map object as a layer

  setEnable = (name) => {
    this.setState({[name]: !this.state[name]});
  };

  getData = async () => {
    try {
      let err, data;
      [err, data] = await getData();

      if (err) console.log(err);
      console.log(data);
      this.setState({data: data});
    } catch (err) {
      console.log(err);
    }
  };

}

export default MapContainer;