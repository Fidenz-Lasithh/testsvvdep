import React from 'react';
import { Subscribe } from 'unstated';

import MapContainer from '../../containers/map.container';
import Traffic from './traffic';

const TrafficComponent = () => {
  return (
    <Subscribe to={[MapContainer]}>
      {map => (
        <Traffic mapContainer={map} />
      )}
    </Subscribe>
  );
};

export default TrafficComponent;