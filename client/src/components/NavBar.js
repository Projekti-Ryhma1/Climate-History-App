import './NavBar.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useCookies } from 'react-cookie';
import jwtDecode from 'jwt-decode';
import Row from 'react-bootstrap/esm/Row';
import { useEffect, useState } from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ListGroup from 'react-bootstrap/ListGroup';

export default function NavBar(props) {
  const [cookies] = useCookies(['token']);
  const [isMobileView, setMobileSize] = useState(window.innerWidth < props.maxWindowWidth); // Sets the boolean value for window width
  let username = "";
  let customViewPath;
  if (cookies.token) {
    username = jwtDecode(cookies.token).username;
    customViewPath = "/custom/" + username;
  }

  useEffect(() => { // Sets listener for the current window's horizontal size and tells when mobile view is used
    window.addEventListener('resize', function () {
      setMobileSize(window.innerWidth < props.maxWindowWidth);
    });
  }, [])

  // Sets which navbar buttons are visible when user is logged in or is not logged in.
  // Normal view: Creates all the buttons for a single User dropdown.
  // Mobile view: Creates all the user buttons to be listed in a main dropdown as an item.
  function checkRoutes() {
    let result;
    if (cookies.token) { // User is logged in
      if (!isMobileView) { // Normal view
        result =
          <Nav className="lt-auto" variant="dark" >
            <Navbar.Toggle aria-controls="navbar-normal" />
            <Navbar.Collapse >
              <NavDropdown title={"User ( " + username + " )"}>
                <ListGroup>
                  <ListGroup.Item action href="/preferences">Preferences</ListGroup.Item>
                  <ListGroup.Item action href={customViewPath}>Custom View</ListGroup.Item>
                  <ListGroup.Item action href="/logout">Logout</ListGroup.Item>
                </ListGroup>
              </NavDropdown>
            </Navbar.Collapse>
          </Nav>
      } else {
        result =
          <ListGroup>
            <ListGroup.Item action href="/preferences">Preferences</ListGroup.Item>
            <ListGroup.Item action href={customViewPath}>Custom View</ListGroup.Item>
            <ListGroup.Item action href="/logout">Logout</ListGroup.Item>
          </ListGroup>
      }
    } else { // User is not logged in
      if (isMobileView) {
        result =
          <ListGroup>
            <ListGroup.Item action href="/signup">Signup</ListGroup.Item>
            <ListGroup.Item action href="/Login">Login</ListGroup.Item>
          </ListGroup>
      } else {
        result =
        <>
          <Nav.Link href="/signup">Signup</Nav.Link>
          <Nav.Link href="/Login">Login</Nav.Link>
        </>
      }
    }
    return result;
  }

  if (!isMobileView) { // Desktop window
    return (
      <Navbar bg="dark" variant="dark">
        <Container>
          <Row>
            <Nav className="navbar-normal">
              <Navbar.Brand href="/" >Climate Data</Navbar.Brand>
              <Nav.Link href="/">Temperature & CO2 Concentrations</Nav.Link>
              <Nav.Link href="/emissions">Emissions</Nav.Link>
              {checkRoutes()}
            </Nav>
          </Row>
        </Container>
      </Navbar>
    )
  }
  else { //Mobile window
    return (
      <Navbar expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/" >Climate Data</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-mobile" />
          <Navbar.Collapse className="navbar-mobile">
            <ListGroup>
              <ListGroup.Item action href="/">Temperature & CO2 Concentrations</ListGroup.Item>
              <ListGroup.Item action href="/emissions">Emissions</ListGroup.Item>
            </ListGroup>
            {checkRoutes()}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  }
}