import React, { Component } from 'react';
import { Segment, Dimmer, Loader, Grid } from 'semantic-ui-react';
import ReactMapboxGl, { Feature, Layer } from "react-mapbox-gl";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import WeatherPopup from '../popup/weather-popup';
import TrafficPopup from '../popup/modal';
import trafficMarker from '../../assets/markers/traffic_counting.svg';
import weatherMarker from '../../assets/markers/weather_data.svg';

import 'react-datepicker/dist/react-datepicker.css';
import './index.css';

const MapComponent = ReactMapboxGl({accessToken: 'pk.eyJ1Ijoic3RlZmFudmFuIiwiYSI6ImNqb2ZlOXNvMzAzaWIzd3J4dmhpOWlkNDUifQ.MkqUKuVW0avbeq5aAKfrcg'});

class Map extends Component {
  constructor() {
    super();

    this.state = {
      station: null,
      stationName: null,
      popup: false,
      dateFrom: '',
      dateTo: ''
    }
  }

  handleClick = async (stationName, screen) => {
    let res;

    if (screen === 'traffic') {
      this.setState({stationName});
      this.props.mapContainer.toggleModal();
    } else if (screen === 'weather') {
      res = await this.props.mapContainer.getWeatherStationData(stationName);
      this.setState({station: res, popup: true});
    }
  };

  handleDateChange = (name, date) => {
    this.setState({[name]: date});
  };

  togglePopup = () => {
    this.setState({popup: !this.state.popup});
  };


  render() {
    const { mapData, currentLocation, zoom, fetched, screen, modal } = this.props.mapContainer.state;
    const { station, popup, stationName, dateFrom, dateTo } = this.state;

    const image = new Image(50, 50);
    if (screen === 'traffic') {
      image.src = trafficMarker;
    } else if (screen === 'weather') {
      image.src = weatherMarker;
    }
    const images = {
      weather: ["weather", image],
      traffic: ["traffic", image]
    };

    const renderFeatures = () => {
      try {
        return mapData.features.map((data) => {
          return (
            <Feature
              key={screen === 'weather' ? data._id : data.properties.nr}
              onClick={() => this.handleClick(screen === 'weather' ? data._id : data.properties.nr, screen)}
              coordinates={data.geometry.coordinates}
            />
          )
        })
      } catch (error) {
        console.log(error);
      }
    };

    const renderPopup = () => {
      if (screen === 'weather') {
        return <WeatherPopup station={station} onClick={this.togglePopup} />
      }
    };
  
    const renderModal = () => {
      if (screen === 'traffic') {
        return <TrafficPopup stationName={stationName} />
      }
    };

    const renderDatePicker = () => {
      if (screen === 'weather') {
        return (
          <Segment compact>
            <Grid columns={2} stackable>
              <Grid.Row>
                <Grid.Column textAlign='right'>
                  <label>Date from</label>
                  <DatePicker
                    dateFormat="DD/MM/YYYY"
                    selected={dateFrom === "" ? null : dateFrom}
                    onChange={(e) => this.handleDateChange('dateFrom', e)}
                    maxDate={moment()}
                  />
                </Grid.Column>
                <Grid.Column textAlign='left'>
                  <label>Date to</label>
                  <DatePicker
                    dateFormat="DD/MM/YYYY"
                    selected={dateTo === "" ? null : dateTo}
                    onChange={(e) => this.handleDateChange('dateTo', e)}
                    maxDate={moment()}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        );
      }
    };

    
    return (
      <Segment floated='right' size='large'>
        {fetched ? (
          <MapComponent
            style="mapbox://styles/mapbox/streets-v8"
            zoom={zoom ? zoom : [3]}
            center={currentLocation ? currentLocation : [10.6943854, 61.0054288]}
            containerStyle={{
              'height': '100%',
              'width': '100%'
            }}
          >
            {renderDatePicker()}
            <Layer
              type="symbol"
              images={images[screen]}
              layout={{ "icon-image": `${screen}`, "icon-allow-overlap": true }}
            >
              {renderFeatures()}
            </Layer>
            {popup && (
              renderPopup()
            )}
            {modal && (
              renderModal()
            )}
          </MapComponent>
        ) : (
          <Dimmer active inverted>
            <Loader size='big'>Loading...</Loader>
          </Dimmer>
        )}
      </Segment>
    )
  }
}

export default Map;