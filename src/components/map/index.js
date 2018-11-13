import React from 'react';
import { Subscribe } from 'unstated';

import MapContainer from '../../containers/map.container';
import Map from './map';

const MapComponent = () => {
  return (
    <Subscribe to={[MapContainer]}>
      {map => (
        <Map mapContainer={map} />
      )}
    </Subscribe>
  );
};

export default MapComponent;