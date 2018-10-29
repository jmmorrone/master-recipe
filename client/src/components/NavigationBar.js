import React from 'react';
import {
  Navbar,
  Nav,
  NavItem,
  FormGroup,
  FormControl,
  Image,
} from 'react-bootstrap';

class Header extends React.Component {
  render() {
    return (
      <Navbar staticTop>
        <Navbar.Header>
          <Navbar.Brand href="/">
            <Image src="/logo.png" href="/" responsive />
          </Navbar.Brand>
          <Navbar.Brand href="/">
            Master Recipe!
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Navbar.Form pullLeft>
            <FormGroup>
              <FormControl type="text" placeholder="Search recipe" />
            </FormGroup>
          </Navbar.Form>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">My Recipes</NavItem>
            <NavItem eventKey={2} href="#">Create Recipe</NavItem>
            <NavItem />
            <NavItem eventKey={3} href="#">Log In</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
