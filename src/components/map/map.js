import React, { Component } from 'react';
import { Segment, Dimmer, Loader, Grid, Message } from 'semantic-ui-react';
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
      date: '',
      error: null
    }
  }

  handleClick = async (stationName, screen) => {
    let res;

    if (screen === 'traffic') {
      this.setState({stationName});
      this.props.mapContainer.toggleModal();
    } else if (screen === 'weather') {
      const { date } = this.state;
      const formattedDate = moment(date).format('YYYY/MM/DD HH:mm');
      if (date) {
        res = await this.props.mapContainer.getWeatherStationData(stationName, formattedDate);
        if (res) {
          this.setState({station: res});
          this.togglePopup();
        }
        else {
          this.setState({error: 'Please select a different date'}, 
          () => {
            setTimeout(() => this.setState({ error: null }), 4000);
          })
        }
      }
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
    const { station, popup, stationName, date, error } = this.state;

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
        return <WeatherPopup station={station} onClick={this.togglePopup} open={popup} />
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
            <Grid columns={1} textAlign='center'>
              <Grid.Row>
                <Grid.Column textAlign='center'>
                  <label>Date</label>
                  <DatePicker
                    dateFormat="DD/MM/YYYY HH:mm"
                    selected={date === "" ? null : date}
                    onChange={(e) => this.handleDateChange('date', e)}
                    maxDate={moment()}
                    isClearable={true}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={10}
                    timeCaption="Time"
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        );
      }
    };

    const renderError = () => {
      return (
        <Grid columns={1} textAlign='center'>
          <Grid.Row>
            <Grid.Column textAlign='center'>
              <Message error content={error} compact size='big' />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      );
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
            {error && (
              renderError()
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