import React from 'react';
import { Subscribe } from 'unstated';

import MapContainer from '../../containers/map.container';
import Friction from './friction';

const FrictionComponent = () => {
  return (
    <Subscribe to={[MapContainer]}>
      {map => (
        <Friction mapContainer={map} />
      )}
    </Subscribe>
  );
};

export default FrictionComponent;