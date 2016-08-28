import React from 'react';
import DocumentTitle from 'react-document-title';
import classnames from 'classnames';

import Panorama from '../panorama';
import NoMatch from '../no-match';


function findIndex(arr, cb) {
  let rv = -1;
  arr.some((item, i) => {
    const success = cb(item);
    if (success) {
      rv = i;
    }
    return success;
  });
  return rv;
}

const PanoramaSignle = (props) => {
  const pid = parseInt(props.params.panoramaId, 10);
  const i = findIndex(props.panoramas, p => p.post_id === pid);

  if (-1 === i) {
    return <NoMatch {...props} />
  }

  const panorama = props.panoramas[i];
  const directLink = panorama.post_id ?
    `https://vk.com/wall${panorama.owner_id}_${panorama.post_id}` :
    `https://vk.com/id${panorama.owner_id}?z=photo${panorama.owner_id}_${panorama.pid}`;

  return (
    <DocumentTitle title={panorama.text + ' | Panoramas | nilfalse'}>
      <div className={classnames('PanoramaSignle', props.className)} style={props.style}>
      <Panorama panorama={panorama} directLink={directLink} {...props} /> 
      </div>
    </DocumentTitle>
  );
};

export default PanoramaSignle;
