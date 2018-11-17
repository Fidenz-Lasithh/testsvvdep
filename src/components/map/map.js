import React, { Component } from 'react';
import { Segment, Dimmer, Loader } from 'semantic-ui-react';
import ReactMapboxGl, { Feature, Layer } from "react-mapbox-gl";
import WeatherPopup from '../popup/weather-popup';
import TrafficPopup from '../popup/modal';
import trafficMarker from '../../assets/markers/traffic_counting.svg';
import weatherMarker from '../../assets/markers/weather_data.svg';

const MapComponent = ReactMapboxGl({accessToken: 'pk.eyJ1Ijoic3RlZmFudmFuIiwiYSI6ImNqb2ZlOXNvMzAzaWIzd3J4dmhpOWlkNDUifQ.MkqUKuVW0avbeq5aAKfrcg'});

class Map extends Component {
  constructor() {
    super();

    this.state = {
      station: null,
      stationName: null,
      popup: false
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
  }

  togglePopup = () => {
    this.setState({popup: !this.state.popup});
  }

  // TODO: change mouse pointer on hover

  render() {
    const { mapData, currentLocation, zoom, fetched, screen, modal } = this.props.mapContainer.state;
    const { station, popup, stationName } = this.state;

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
            // onMouseEnter={this.onToggleHover('pointer')}
            // onMouseLeave={this.onToggleHover('')}
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
    }
    
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