import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';

import store, { history } from './store';
import Home from './components/home';
import PanoramaGrid from './components/panorama-grid';
import Panorama from './components/panorama-single';
import CV from './components/cv';
import NoMatch from './components/no-match';


const routes = (Root) => (
  <Provider store={ store }>
    <Router history={ history }>
      <Route path="/" component={ Root }>
        <IndexRoute component={ Home } />
        <Route path="panoramas">
          <IndexRoute component={ PanoramaGrid } />
          <Route path=":panoramaId" component={ Panorama } />
        </Route>
        <Route path="cv" component={ CV } />
        <Route path="*" component={ NoMatch } />
      </Route>
    </Router>
  </Provider>
);

export default routes;
