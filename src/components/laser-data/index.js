import React from 'react';
import { Subscribe } from 'unstated';

import MapContainer from '../../containers/map.container';
import LaserData from './laser-data';

const LaserDataComponent = () => {
  return (
    <Subscribe to={[MapContainer]}>
      {map => (
        <LaserData mapContainer={map} />
      )}
    </Subscribe>
  );
};

export default LaserDataComponent;