import React, { Component } from 'react';
import { Segment, Dimmer, Loader, Grid, Message, Button } from 'semantic-ui-react';
import ReactMapboxGl, { Feature, Layer } from "react-mapbox-gl";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import WeatherPopup from '../popup/weather-popup';
import TrafficPopup from '../popup/modal';
import VideoPlayer from '../popup/videoPlayer';
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
          this.setState({error: 'There is no data available. Please select a different date'}, 
          () => {
            setTimeout(() => this.setState({ error: null }), 4000);
          })
        }
      } else {
          this.setState({error: 'Please select a date to view historical data'}, 
          () => {
            setTimeout(() => this.setState({ error: null }), 4000);
          })
      }
    }
  };

  handleDateChange = (name, date) => {
    this.setState({[name]: date});
  };

  handleDateEnter = async () => {
    const { date } = this.state;
    const formattedDate = moment(date).format('YYYY/MM/DD HH:mm');

    if (date) {
      await this.props.mapContainer.getPlowTrucksData(formattedDate);
    }
  }

  togglePopup = () => {
    this.setState({popup: !this.state.popup});
  };


  render() {
    const { mapData, currentLocation, zoom, fetched, screen, modal, presetDate, errors, showVideoPlayer } = this.props.mapContainer.state;
    const { station, popup, stationName, date, error } = this.state;
    
    const renderMarker = () => {
      const image = new Image(50, 50);
      if (screen === 'traffic') {
        image.src = trafficMarker;
      } else if (screen === 'weather') {
        image.src = weatherMarker;
      }
      return [screen, image];
    }

    const renderFeatures = () => {
      try {
        if (screen === 'plow-trucks') {
          // Check if map data is empty because plow-trucks screen is first loaded without map data
          if (mapData) {
            return mapData.features.map((data) => {
              return (
                <Feature
                  key={data.id}
                  coordinates={data.geometry.coordinates}
                />
              );
            });
          } else {
            return null;
          }
        } else if (screen === 'weather' || screen === 'traffic') {
          return mapData.features.map((data) => {
            return (
              <Feature
                key={screen === 'weather' ? data._id : data.properties.nr}
                onClick={() => this.handleClick(screen === 'weather' ? data._id : data.properties.nr, screen)}
                coordinates={data.geometry.coordinates}
              />
            );
          });
        };
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
    
    const renderVideoPlayer = () => {
      // if (screen === 'videos') {
        return <VideoPlayer mapContainer={this.props.mapContainer} />
      // }
    };

    const renderDatePicker = () => {
      if (screen === 'weather' || screen === 'plow-trucks') {
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
                    placeholderText={presetDate}
                  />
                  {(screen === 'plow-trucks') ? (
                    <Button onClick={this.handleDateEnter}>Display</Button>
                  ) : (
                    null
                  )}
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
              <Message error content={error || errors.message} compact size='big' />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      );
    };

    const mapFeatures = (mapData) => {
      let color;
      if (mapData) {
        mapData.features.map((feature) => {
          return color = feature.properties.color;
        });
      }

      if (!color) {
        return 'black';
      }
      return color;
    }

    const renderLayer = () => {
      if (screen === 'plow-trucks') {
        return (
          <Layer
            type="line"
            layout={{
              'line-cap': 'round',
              'line-join': 'round'
            }}
            paint={{
              'line-width': 10,
              'line-color': mapFeatures(mapData)
            }}
          >
            {renderFeatures()}
          </Layer>
        );
      } else {
        return (
          <Layer
            type="symbol"
            images={renderMarker()}
            layout={{ "icon-image": `${screen}`, "icon-allow-overlap": true }}
          >
            {renderFeatures()}
          </Layer>
        );
      }
    };

    return (
      <Segment floated='right' size='large'>
        {fetched ? (
          <MapComponent
            style="mapbox://styles/mapbox/streets-v8"
            zoom={zoom ? zoom : [6]}
            center={currentLocation ? currentLocation : [20.205902, 69.414571]}
            containerStyle={{
              'height': '100%',
              'width': '100%'
            }}
          >
            {renderDatePicker()}
            {renderLayer()}
            {popup && (
              renderPopup()
            )}
            {modal && (
              renderModal()
            )}
            {showVideoPlayer && (
              renderVideoPlayer()
            )}
            {(error || errors.hasErrors) && (
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