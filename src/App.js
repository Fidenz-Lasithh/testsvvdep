import React, { Component, Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Subscribe } from 'unstated';

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
          <div className="App">
            <BrowserRouter>
              <Fragment>
                <SignIn userContainer={user} />
                <Nav />
                <Routes />
                <Map mapContainer={map} />
              </Fragment>
            </BrowserRouter>
          </div>
        )}
      </Subscribe>
    );
  }
}

export default App;
