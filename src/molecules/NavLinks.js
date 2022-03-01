/** @format */

import React from 'react';
import { useOktaAuth } from '@okta/okta-react';
import NavItem from './NavItem'
import { withRouter } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useAuth } from './../redux/hooks';

const Button = ({ isActive, to, label }) => {
  const { authService } = useOktaAuth();
  const { isAuthenticated, name, groups } = useAuth();

  let classes = ["nav-link"];
  if (isActive) classes.push("active");
  return (
    <Navbar.Collapse id="responsive-navbar-nav">
      {isAuthenticated && (
        <>
          <Nav className="mr-auto" > 
            {groups.includes('Admin') && (
              <>
                <NavItem  to='/admin/managers' label='Managers' />
                <NavItem  to="/admin/refdata" label='Ref Data' />
                <NavItem  to="/admin/logs" label='Logs' />
              </>
            )}
            {groups.includes('Manager') && (
              <>
                <NavItem  to="/manager/customers" label='Customers' />
                <NavItem  to="/manager/receipts" label='Receipts' />
                <NavItem  to="/manager/reports" label='Reports' />
              </>
            )}
          </Nav>
          <Nav>
            <NavDropdown title={'Signed in: ' + name} id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => authService.logout('/')}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </>
      )}
      {!isAuthenticated && (
        <Nav>
          <Nav.Link onClick={() => authService.login('/')}>Login</Nav.Link>
        </Nav>
      )}
    </Navbar.Collapse>
  );
};

export default withRouter(({ location, ...props }) => {
  const isActive = location.pathname === props.to;
  return <Button {...props} isActive={isActive} />;
});
// export default Button;
