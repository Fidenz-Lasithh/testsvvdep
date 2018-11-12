import React from 'react';
import { Subscribe } from 'unstated';

import MapContainer from '../../containers/map.container';
import PlowTrucks from './plow-trucks';

const PlowTrucksComponent = () => {
  return (
    <Subscribe to={[MapContainer]}>
      {map => (
        <PlowTrucks mapContainer={map} />
      )}
    </Subscribe>
  );
};

export default PlowTrucksComponent;