import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';

import store, { history } from './store';
import AppShell from './components/app-shell';
import Home from './components/home';
import Panoramas from './components/panoramas';
import CV from './components/cv';
import NotFound from './components/not-found';


const routes = (
  <Provider store={ store }>
    <Router history={ history }>
      <Route path="/" component={ AppShell }>
        <IndexRoute component={ Home } />
        <Route path="/panoramas" component={ Panoramas } />
        <Route path="/cv" component={ CV } />
        <Route path="*" component={ NotFound } />
      </Route>
    </Router>
  </Provider>
);

export default routes;
