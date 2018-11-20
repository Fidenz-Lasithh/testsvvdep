import moment from 'moment';
import _ from 'lodash';
import { Container } from 'unstated';

import { getData, getWeatherStationData, getTrafficStationData, getPlowTrucksData } from '../api/map.api';

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
    modal: false,
    modalLoading: false,
    errors: {
      hasErrors: false,
      message: null
    },
    modalErrors: {
      hasErrors: false,
      message: null
    },
    modalParams: {
      stationName: null,
      param: null,
      dateFrom: null,
      dateTo: null
    },
    stationData: null,
    presetDate: null,
  };

  toggleModal = () => {
    this.setState({
      stationData: null, 
      modal: !this.state.modal, 
      modalErrors: { 
        hasErrors: false, 
        message: null 
      }
    });
  };

  setModalParams = (stationName, param, dateFrom, dateTo) => {
    this.setState({
      modalParams: {
        stationName,
        param,
        dateFrom,
        dateTo
      }
    }, () => this.getTrafficStationData());
  }

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

  // TODO: Function to combine data from current screen and from other enabled screens
  readMapData = async (component) => {
    const { data } = this.state;
    
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
      this.setState({fetched: false});

      [err, data] = await getData(component);
      if (err) console.log(err);

      this.setState({data: data}, () => this.readMapData(component));
    } catch (error) {
      console.log(error);
    }
  };

  mapData = (data) => {
    const mappedData = [];
    
    Object.keys(data).forEach((key) => {
      const [date, hour] = key.split(' ');
      const indexOfCurrentData = _.findIndex(mappedData, { date });
      const roundedNum = Number.parseFloat(data[key]).toFixed(2);
      if (indexOfCurrentData === -1) {
        mappedData.push({
          date,
          hours: {
            [hour]: roundedNum
          }
        });
      } else {
        mappedData[indexOfCurrentData].hours[hour] = roundedNum;
      }
    });
    
    return mappedData;
  };

  getWeatherStationData = async (stationName, date) => {
    let err, data;

    try {
      [err, data] = await getWeatherStationData(stationName, date);
      if (err) console.log(err);
      else {
        if (_.isEmpty(data)) {
          return null;
        } else {
          return data;
        }
      };
    } catch (error) {
      console.log(error);
    }
  };

  getTrafficStationData = async () => {
    const { stationName, dateFrom, dateTo, param } = this.state.modalParams;
    let err, data;
    try {
      this.setState({modalLoading: true, modalErrors: { hasErrors: false, message: null }});
      [err, data] = await getTrafficStationData(stationName, dateFrom, dateTo, param);
      if (err) console.log(err);
      else {
        const mappedData = this.mapData(data);
        if (_.isEmpty(mappedData)) {
          this.setState({
            modalLoading: false, 
            modalErrors: {
              hasErrors: true, 
              message: "Please select a different date range"
            }
          })
        } else {
          this.setState({stationData: mappedData,  modalLoading: false});
        }
      };
    } catch (error) {
      console.log(error);
    }
  };

  // TODO: write a function to calculate colours for lines based on time entered in datepicker
  // feed into json colour prop
  getPlowTrucksData = async (date) => {
    let err, data;

    try {
      this.setState({fetched: false});

      [err, data] = await getPlowTrucksData(date);
      if (err) console.log(err);
      else {
        if (_.isEmpty(data)) {
          this.setState({
            errors: {
              hasErrors: true, 
              message: "Please select a different date to display"
            }
          }, 
          () => {
            setTimeout(() => this.setState({ errors: {hasErrors: false, message: null} }), 4000);
          })
        } else {
          const newObj = this.colourPlowTrucksData(data, date);
          this.setState({data: newObj, presetDate: date}, () => this.readMapData('plow-trucks'));
        }
      };
    } catch (error) {
      console.log(error);
    }
  };

  colourPlowTrucksData = (plowTruckData, date) => {
    let colouredPlowTrucksData = [];
    
    plowTruckData.features.map((data) => {
      const colour = this.setColour(data.properties.time, date);
      data.properties = {
        ...data.properties,
        color: colour
      };
      colouredPlowTrucksData.push(data);
    });

    return colouredPlowTrucksData;
  };

  setColour = (date, dateEntered) => {
    const timeDifference = moment(dateEntered).subtract(date);
    if (timeDifference < '2 hours') {
      return 'green';
    } else if (timeDifference > '2 hours' && timeDifference < '1 day') {
      return 'yellow';
    } else {
      return 'red';
    }
  };
}

export default MapContainer;