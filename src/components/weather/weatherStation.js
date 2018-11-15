import React from 'react';
import { Menu } from 'semantic-ui-react';

export default ({station, onClick}) => {
  return (
    <Menu.Item onClick={() => onClick(station.id)}>
      Weather Station 1
    </Menu.Item>
  );
};