import React from 'react';
import { Subscribe } from 'unstated';

import MapContainer from '../../containers/map.container';
import Weather from './weather';

const WeatherComponent = () => {
  return (
    <Subscribe to={[MapContainer]}>
      {map => (
        <Weather mapContainer={map} />
      )}
    </Subscribe>
  );
};

export default WeatherComponent;