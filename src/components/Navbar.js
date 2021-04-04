import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-primary fixed">
      <div className="container">
        <Link className="navbar-brand" to="/">
          My Bookshelf
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
