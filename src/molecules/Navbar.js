/** @format */

import React from 'react';
import NavLinks from './NavLinks';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Navbar
      style={{ width: '100vw' }}
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      fixed="top"
    >
      <Navbar.Brand as={Link} to="/">
        Invoice App
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <NavLinks />
    </Navbar>
  );
};

export default Header;
