import * as React from 'react';
import { Route } from 'react-router';

import ConnectedSwitch from './pages/components/Router/ConnectedSwitch';
import PrivateRoute from './pages/components/Router/PrivateRoute';

// Production pages
import PageLogin from './pages/PageLogin';
import PageMain from './pages/PageMain';
import PageRegister from './pages/PageRegister';
// import WelcomePage from './pages/WelcomePage';

// Status pages
// import ErrorNotFoundPage from './pages/ErrorNotFoundPage';
// import LoadPage from './pages/LoadPage';

const Routes = () => (
  <>
    <ConnectedSwitch>
      <Route path={'/'} exact={true} component={PageLogin}/>
      <Route path={'/login'} component={PageLogin}/>
      <Route path={'/register'} component={PageRegister}/>

      <PrivateRoute path={'/main'} component={PageMain}/>

      {/* <PrivateRoute path={'/welcome'} component={WelcomePage}/> */}
      {/* <Route component={ErrorNotFoundPage}/> */}
    </ConnectedSwitch>
  </>
);

export default Routes;
