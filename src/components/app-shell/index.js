import React from 'react';
import DocumentTitle from 'react-document-title';
import classnames from 'classnames';

import AppBar from '../app-bar';
import PageContainer from '../page-container';

import './shell.css';


const AppShell = (props) => (
  <DocumentTitle title="nilfalse">
    <div className={classnames('AppShell', props.className)} style={props.style}>
      <AppBar {...props} />
      <PageContainer {...props} />
    </div>
  </DocumentTitle>
);

export default AppShell;
