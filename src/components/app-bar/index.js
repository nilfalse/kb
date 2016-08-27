import React from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';

import './bar.css';


const AppBar = (props) => (
  <header className={classnames('AppBar', props.className)} style={props.style}>
    <div className="AppBar__header">
      <h1 className="AppBar__logo"><Link to='/'>nilfalse</Link></h1>
      <nav className="AppBar__nav">
        <li><Link className={classnames({
          'AppBar__nav-item_selected': true
        })} to='/panoramas'>Panoramas</Link></li>
        <li><Link className={classnames({
          'AppBar__nav-item_selected': false
        })} to='/cv'>Сurriculum vitæ</Link></li>
      </nav>
    </div>
  </header>
);

export default AppBar;
