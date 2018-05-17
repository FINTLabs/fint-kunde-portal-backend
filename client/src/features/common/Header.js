import React, {PropTypes} from 'react';
import {Link} from "react-router-dom";

const Header = () => {
  return (
    <nav>
      <Link to="/about" activeClassName="active">About</Link>
    </nav>
  );
};

export default Header;
