import React from 'react';
import { Menu } from 'semantic-ui-react';

export default ({equipment, onClick}) => {
  return (
    <Menu.Item onClick={() => onClick(equipment.id)}>
      Traffic counting equipment
    </Menu.Item>
  );
};