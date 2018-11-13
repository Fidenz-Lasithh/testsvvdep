import React from 'react';
import { Subscribe } from 'unstated';

import MapContainer from '../../containers/map.container';
import Videos from './videos';

const VideosComponent = () => {
  return (
    <Subscribe to={[MapContainer]}>
      {map => (
        <Videos mapContainer={map} />
      )}
    </Subscribe>
  );
};

export default VideosComponent;