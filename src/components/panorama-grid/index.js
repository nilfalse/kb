import React from 'react';
import DocumentTitle from 'react-document-title';
import classnames from 'classnames';

import Panorama from '../panorama';


const PanoramaGrid = (props) => (
  <DocumentTitle title="Panoramas | nilfalse">
    <div className={classnames('PanoramaGrid', props.className)} style={props.style}>
      <h1 className="PanoramaGrid__heading">Panoramas</h1>
      {props.panoramas.map((panorama, i) => {
        return <Panorama {...props} key={i} i={i} panorama={panorama} />
      })}
    </div>
  </DocumentTitle>
);

export default PanoramaGrid;
