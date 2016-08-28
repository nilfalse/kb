import React from 'react';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';
import classnames from 'classnames';


const CV = (props) => (
  <DocumentTitle title="Curriculum vitæ | nilfalse">
    <div className={classnames('CV', props.className)} style={props.style}>
      <h1>Curriculum vitæ</h1>
      <p className="CV__intro">Nothing here right now. Come back soon.</p>
      <p>Meanwhile you can take a look at my self-made <Link to="/panoramas">panoramas</Link>.</p>
    </div>
  </DocumentTitle>
);

export default CV;
