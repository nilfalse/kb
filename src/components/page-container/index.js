import React from 'react';
import classnames from 'classnames';

import './container.css';


const PageContainer = (props) => (
  <div className={classnames('PageContainer', props.className)} style={props.style}>
    {React.cloneElement(props.children, props)}
  </div>
);
export default PageContainer;
