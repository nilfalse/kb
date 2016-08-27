import React from 'react';
import { Link } from 'react-router';


const Home = (props) => (
  <div>
    <h1>Welcome!</h1>
    <p>This is my homepage</p>
    <p>Check out my <Link to="/cv">curriculum&nbsp;vitæ</Link>.</p>
  </div>
);
export default Home;
