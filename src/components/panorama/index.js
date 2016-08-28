import React, { Component } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';

import './pan.css';


export default class Panorama extends Component {
  render() {
    const { className, style, panorama, directLink } = this.props;
    const image = panorama.sizes.reduce((biggest, pan) => pan.width > biggest.width ? pan : biggest);

    const linkContent = <img src={image.src} alt={'type ' + image.type} />;

    return (
      <figure className={classnames('Panorama', className)} style={style}>
        <figcaption>{panorama.text}</figcaption>
        <p>{directLink ?
          <a href={directLink} target="_blank">{linkContent}</a> :
          <Link to={'/panoramas/' + panorama.post_id}>{linkContent}</Link>}
        </p>
      </figure>
    );
  }
}
