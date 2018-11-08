import React, { Component, Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Subscribe } from 'unstated';
import { Segment } from 'semantic-ui-react';

//Containers
import UserContainer from './containers/user.container';
import MapContainer from './containers/map.container';

//Components
import SignIn from './components/sign-in';
import Nav from './components/nav';
import Routes from './routes';
import Map from './components/map';

class App extends Component {
  render() {
    return (
      <Subscribe to={[UserContainer, MapContainer]}>
        {(user, map) => (
          <Segment basic>
            <BrowserRouter>
              <Fragment>
                <SignIn userContainer={user} />
                <Nav />
                <Segment.Group horizontal>
                  <Routes />
                  <Map mapContainer={map} />
                </Segment.Group>
              </Fragment>
            </BrowserRouter>
          </Segment>
        )}
      </Subscribe>
    );
  }
}

export default App;
