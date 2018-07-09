import * as React from 'react';
import { Route } from 'react-router';

// import ConnectedSwitch from './components/Router/ConnectedSwitch';

// Production pages
import LoginPage from './pages/LoginPage';
// import WelcomePage from './pages/WelcomePage';

// Status pages
// import ErrorNotFoundPage from './pages/ErrorNotFoundPage';
// import LoadPage from './pages/LoadPage';

const Routes = () => (
  <>
    {/* <ConnectedSwitch> */}
      <Route path={'/'} exact={true} component={LoginPage}/>
      <Route path={'/login'} component={LoginPage}/>

      {/* <PrivateRoute path={'/welcome'} component={WelcomePage}/> */}

      {/* <Route component={ErrorNotFoundPage}/> */}
    {/* </ConnectedSwitch> */}
  </>
);

export default Routes;
