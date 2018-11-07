import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

//Components
import Videos from './components/videos';
import Traffic from './components/traffic';
import PlowTrucks from './components/plow-trucks';
import Friction from './components/friction';
import Weather from './components/weather';
import LaserData from './components/laser-data';

const Routes = () => (
  <Fragment>
    <Route exact path='/' component={Videos} />
    <Route exact path='/traffic' component={Traffic} />
    <Route exact path='/plow-trucks' component={PlowTrucks} />
    <Route exact path='/friction' component={Friction} />
    <Route exact path='/weather' component={Weather} />
    <Route exact path='/laser-data' component={LaserData} />
  </Fragment>
)

export default Routes;