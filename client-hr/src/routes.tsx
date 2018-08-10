import * as React from 'react';
import { Route } from 'react-router';

import ConnectedSwitch from './pages/components/Router/ConnectedSwitch';
import PrivateRoute from './pages/components/Router/PrivateRoute';

// Production pages
import PageMain from './pages/PageMain';
import PagePost from './pages/PagePost';

// Status pages
// import ErrorNotFoundPage from './pages/ErrorNotFoundPage';
// import LoadPage from './pages/LoadPage';

const Routes = () => (
  <>
    <ConnectedSwitch>
      <PrivateRoute path={'/post'} component={PagePost}/>
      <Route path={'/'} component={PageMain}/>
    </ConnectedSwitch>
  </>
);

export default Routes;
