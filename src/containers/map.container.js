import { Container } from 'unstated';

import { getData } from '../api/map.api';

class MapContainer extends Container {
  state = {
    data: null
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