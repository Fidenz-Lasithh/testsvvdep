import React from 'react';
import { Menu } from 'semantic-ui-react';

export default (props) => {
  return (
    <Menu.Item onClick={() => props.onClick(props.station._id)}>
      Weather Station {props.station._id}
    </Menu.Item>
  );
};