import React from 'react';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';
import classnames from 'classnames';


const NoMatch = (props) => {
  const { className, style } = props;
  return (
    <DocumentTitle title="Page Not Found | nilfalse">
      <div className={classnames('NoMatch', className)} style={style}>
        <h1>Page Not Found</h1>
        <p className="NoMatch__content">
          <Link to="/">Home</Link>
        </p>
      </div>
    </DocumentTitle>
  );
};

export default NoMatch;
