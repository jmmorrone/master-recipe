import React from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar, FormGroup, FormControl, Button, Image,
} from 'react-bootstrap';

import { login, logout, isLoggedIn } from '../utils/AuthService';

const Nav = () => ((
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <Image src="/logo.png" responsive />
      </Navbar.Brand>
      <Navbar.Brand>
        <Link to="/">
          Master Recipe!
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Navbar.Form pullLeft>
        <FormGroup>
          <FormControl type="text" placeholder="Search" />
        </FormGroup>{' '}
        <Button type="submit">Submit</Button>
      </Navbar.Form>
      {
        !isLoggedIn() && (
          <Button
            bsStyle="primary"
            className="btn-margin"
            onClick={() => login()}
          >
            Log In
            </Button>
        )
      }
      {
        isLoggedIn() && (
          <Button
            bsStyle="primary"
            className="btn-margin"
            onClick={() => logout()}
          >
            Log Out
          </Button>
        )
      }
    </Navbar.Collapse>
  </Navbar>
));

export default Nav;
