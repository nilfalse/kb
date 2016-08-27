import React, { Component } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';


export default class Panoramas extends Component {
  render() {
    return (
      <div className={classnames('Panoramas', this.props.className)} style={this.props.style}>
        <h1>Panoramas</h1>
        <p className="Panoramas-intro">Now you can go <Link to="/">home</Link>.</p>
        <p>…or try to proceed to <Link to='/some404'>a broken link</Link> to test 404 page.</p>
      </div>
    );
  }
}
