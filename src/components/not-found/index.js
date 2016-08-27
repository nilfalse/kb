import React from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';


const NotFound = (props) => {
  const { className, style, ...rest } = props;
  return (
    <div className={classnames('NotFound', className)} style={style}>
      <h1>Page Not Found</h1>
      <p className="NotFound__content">
        <Link to="/" {...rest}>Home</Link>
      </p>
    </div>
  );
};

export default NotFound;
