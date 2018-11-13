import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import ReactMapboxGl, { GeoJSONLayer } from "react-mapbox-gl";

const MapComponent = ReactMapboxGl({accessToken: 'pk.eyJ1Ijoic3RlZmFudmFuIiwiYSI6ImNqb2ZlOXNvMzAzaWIzd3J4dmhpOWlkNDUifQ.MkqUKuVW0avbeq5aAKfrcg'});

class Map extends Component {

  render() {
    const { data } = this.props.mapContainer.state;
    
    // const mapObj = () => {
    //   if (map && map.traffic) {
    //     console.log(map.traffic);
    //     return map.traffic;
    //   }
    // }
    
    return (
      <Segment floated='right' size='large' id='map-segment'>
        <MapComponent
          style="mapbox://styles/mapbox/streets-v8"
          zoom={[3]}
          // center={[10.6943854, 61.0054288]}
          containerStyle={{
            'height': '100%',
            'width': '100%'
          }}>
            <GeoJSONLayer
              data={data}
              circleLayout={{
                'visibility': 'visible'
              }}
              circlePaint={{
                'circle-color': 'red'
              }}
              symbolLayout={{
                'text-field': '{place}',
                'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                'text-offset': [0, 0.6],
                'text-anchor': 'top'
              }}
              symbolPaint={{
                'text-color': 'red'
              }} />
        </MapComponent>
      </Segment>
    )
  }
}

export default Map;