import moment from 'moment';
import _ from 'lodash';
import { Container } from 'unstated';

import { getData, getWeatherStationData, getTrafficStationData, getPlowTrucksData, getFrictionData } from '../api/map.api';

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
    showVideoPlayer: false,
    // markers: {
    //   traffic: null,
    //   weather: null
    // }
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

  toggleVideoPlayer = () => {
    this.setState({showVideoPlayer: !this.state.showVideoPlayer});
  }
  
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
  
  // Setting weather or traffic marker for points on map
  // setMarker = (component) => {
    //   const image = new Image(50, 50);
    
    //   if (component === 'traffic') {
      //     image.src = trafficMarker;
  //   } else if (component === 'weather') {
    //     image.src = weatherMarker;
    //   }
  //   return [component, image];
  // }
  
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
    // const marker = this.setMarker(component);
    this.setState({mapData: data, fetched: true, screen: component});
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
              message: "There is no data available. Please select a different date range"
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

  getPlowTrucksData = async (date) => {
    let err, data;

    try {
      this.setState({fetched: false, currentLocation: null, zoom: null});

      [err, data] = await getPlowTrucksData(date);
      if (err) console.log(err);
      else {
        if (_.isEmpty(data.features)) {
          this.setState({
            errors: {
              hasErrors: true, 
              message: "The current selected date has no data available"
            },
            data: null,
            presetDate: moment(date).format('DD/MM/YYYY HH:mm')
          }, 
          () => {
            this.readMapData('plow-trucks');
            setTimeout(() => this.setState({ errors: {hasErrors: false, message: null} }), 4000);
          })
        } else {
          const newObj = this.setColourProperty('plow-trucks', data, date);
          this.setState({data: newObj, presetDate: date}, () => this.readMapData('plow-trucks'));
        }
      };
    } catch (error) {
      console.log(error);
    }
  };
// 12/04/2018 17:30
  getFrictionData = async (date) => {
    let err, data;

    try {
      this.setState({fetched: false, currentLocation: null, zoom: null});

      [err, data] = await getFrictionData(date);
      if (err) console.log(err);
      else {
        if (_.isEmpty(data.features)) {
          this.setState({
            errors: {
              hasErrors: true, 
              message: "The current selected date has no data available"
            },
            data: null,
            presetDate: moment(date).format('DD/MM/YYYY HH:mm')
          }, 
          () => {
            this.readMapData('friction');
            setTimeout(() => this.setState({ errors: {hasErrors: false, message: null} }), 4000);
          })
        } else {
          const newObj = this.setColourProperty('friction', data, date);
          this.setState({data: newObj, presetDate: date}, () => this.readMapData('friction'));
        }
      };
    } catch (error) {
      console.log(error);
    }
  };

  setColourProperty = (screen, dataObj, date) => {
    let features = [];
    let colour;

    dataObj.features.map((data) => {
      if (screen === 'plow-trucks') {
        colour = this.setColour('plow-trucks', data.properties, date);
      } else if (screen === 'friction') {
        colour = this.setColour('friction', data.properties);
      }
      
      data = {
        ...data,
        properties: {
          ...data.properties,
          color: colour
        }
      }
      
      return features.push(data);
    });

    let colouredDataObj = 
      {
        features: features,
        type: "FeatureCollection"
      }
    
    return colouredDataObj;
  };

  setColour = (screen, properties, dateEntered) => {
    if (screen === 'plow-trucks') {
      const date = properties.time['$date'];
      const momentDate = moment(new Date(dateEntered));
      const timeDifference = (moment.duration(momentDate.diff(date))).asHours();
  
      if (timeDifference < 2) {
        return '#2cb84b';
      } else if (timeDifference > 2 && timeDifference < 24) {
        return '#ffff00';
      } else if (timeDifference > 24) {
        return '#F7455D';
      }
    } else if (screen === 'friction') {
      const friction = properties.friction;

      if (friction > 0 && friction < 0.26) {
        return '#2cb84b';
      } else if (friction > 0.26 && friction < 0.52) {
        return '#ffff00';
      } else if (friction > 0.52 && friction < 0.81) {
        return '#F7455D'
      }
    } 
  };
}

export default MapContainer;