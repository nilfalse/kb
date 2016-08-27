import React from 'react';
import classnames from 'classnames';

import AppBar from '../app-bar';
import PageContainer from '../page-container';

import './shell.css';


const AppShell = (props) => (
  <div className={classnames('AppShell', props.className)} style={props.style}>
    <AppBar {...props} />
    <PageContainer {...props} />
  </div>
);

export default AppShell;
