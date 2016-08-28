import React from 'react';
import { Link } from 'react-router';

import './home.css';


const Home = (props) => (
  <div className="Home">
    <h1>Be my guest</h1>
    <p>My name is Yaroslav Ilin a.k.a. nilfalse.</p>
    <p>I'm a JavaScript Developer currently employed by <span className="Home__yandex-style">Yandex</span> to work on <a href="https://metrica.yandex.com/promo" target="_blank"><span className="Home__yandex-style">Yandex</span>.Metrica</a> project.</p>
    <p>My hobby is to travel and take some nice wide panorama photos out of the cities I visit.</p>
    <p>I'm going to publish my <Link to="/cv">curriculum&nbsp;vitæ</Link> over there. If you are interested in my professional experience, please, come back soon.</p>
    <p>Meanwhile, you may check out some of my <Link to="/panoramas">panoramas</Link> (warning, traffic!).</p>
  </div>
);

export default Home;
