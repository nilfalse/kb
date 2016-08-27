import React, { Component } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';


export default class CV extends Component {
  render() {
    return (
      <div className={classnames('CV', this.props.className)} style={this.props.style}>
        <h1>Curriculum vitæ</h1>
        <p className="CV-intro">Nothing here. Check this out later.</p>
        <p>Meanwhile you can take a look at my self-made <Link to="/panoramas">panoramas</Link>.</p>
      </div>
    );
  }
}
