import React from 'react';
import { Subscribe } from 'unstated';
import MapContainer from '../../containers/map.container';
import TrafficModal from './traffic-popup';

const ModalComponent = ({stationName}) => {
  return (
    <Subscribe to={[MapContainer]}>
      {map => (
        <TrafficModal mapContainer={map} stationName={stationName} />
      )}
    </Subscribe>
  );
};

export default ModalComponent;