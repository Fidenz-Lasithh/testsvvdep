import React, { Component, Fragment } from 'react';
import { Segment } from 'semantic-ui-react';
import ReactMapboxGl, { Popup, Feature, Layer } from "react-mapbox-gl";

const MapComponent = ReactMapboxGl({accessToken: 'pk.eyJ1Ijoic3RlZmFudmFuIiwiYSI6ImNqb2ZlOXNvMzAzaWIzd3J4dmhpOWlkNDUifQ.MkqUKuVW0avbeq5aAKfrcg'});

class Map extends Component {
  constructor() {
    super();

    this.state = {
      point: null,
      station: null
    }
  }
  // TODO: change state of station when different screens are clicked
  handleClick = (station) => {
    this.setState({station: station});
    // let point;
    // if (e.lngLat) {
    //   point = [e.lngLat.lng, e.lngLat.lat];
    // }
    // console.log(point);
    // this.setState({popup: !this.state.popup, point: location});
  }

  // TODO: change mouse pointer on hover
  // onToggleHover = ({map}, cursor) => {
  //   map.getCanvas().style.cursor = cursor;
  // }

  render() {
    const { mapData, currentLocation, zoom, fetched, screen } = this.props.mapContainer.state;
    const { station } = this.state;

    const renderFeatures = () => {
      console.log(mapData);
      // TODO: logic to render a collection of features
      return (
        <Feature
          // onMouseEnter={this.onToggleHover('pointer')}
          // onMouseLeave={this.onToggleHover('')}
          onClick={() => this.handleClick(mapData)}
          coordinates={mapData.geometry.coordinates}
        />
      );
    };
    // TODO: close popup
    const popupText = () => {
      if (screen === 'traffic') {
        return (
          <Fragment>
            <p>Passenger car count:</p>
            <p>Bus/truck count:</p>
            <p>Vehicle speed: {station.properties['speed_(km/h)']} Kmph</p>
            <p>Other data points</p>
          </Fragment>
        );
      } else if (screen === 'weather') {
        return (
          <Fragment>
            <p>Air temperature (C): {station.properties['Lufttemperatur (§C)']}</p>
            <p>Quality: {station.properties['Kvalitet']}</p>
            <p>Relative humidity (%): {station.properties['Relativ luftfuktighet (%)']}</p>
            <p>Quality: {station.properties['Kvalitet']}</p>
            <p>Roadway temperature (C): {station.properties['Vegbanetemperatur (§C)']}</p>
            <p>Surface conditions: {station.properties['Friksjon i vegbane']}</p>
            <p>Nedb?rsintensitet (mm/t): {station.properties['Nedb?rsintensitet (mm/t)']}</p>
            <p>Precipitation type: {station.properties['Nedb?rstype']}</p>
            <p>Visibility of precipitation (m): {station.properties['Sikt i nedb?r (m)']}</p>
            <p>Wind speed (m/s): {station.properties['Vindhastighet (m/s)']}</p>
            <p>Wind direction (0 - 360): {station.properties['Vindretning (0 - 360ø) (§)']}</p>
            <p>Windshield (m/s): {station.properties['Vindkast (m/s)']}</p>
            <p>Amount of water in roadway (mm): {station.properties['Mengde vann i vegbane (mm)']}</p>
            <p>Amount of ice in roadway (mm): {station.properties['Mengde is i vegbane (mm)']}</p>
            <p>Amount of snow in roadway (mm): {station.properties['Mengde sn? i vegbane (mm)']}</p>
          </Fragment>
        )
      }
    };
    
    return (
      <Segment floated='right' size='large' id='map-segment'>
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
              type="circle"
              paint={{'circle-color': 'red'}}
            >
              {renderFeatures()}
            </Layer>
            {station && (
              <Popup 
                coordinates={station.geometry.coordinates}
                offset={{
                  'bottom-left': [12, -38],  'bottom': [0, -10], 'bottom-right': [-12, -38]
                }}
              >
                {popupText()}
              </Popup>
            )}
          </MapComponent>
        ) : (
          null
        )}
      </Segment>
    )
  }
}

export default Map;