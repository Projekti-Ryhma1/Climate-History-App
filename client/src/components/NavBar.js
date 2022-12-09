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

const maxWindowWidth = 830;

export default function NavBar() {
  const [cookies] = useCookies(['token']);
  const [isMobileView, setMobileSize] = useState(window.innerWidth < maxWindowWidth);
  let username = "";
  if (cookies.token) {
    username = jwtDecode(cookies.token).username;
  }

  useEffect(() => {
    window.addEventListener('resize', function () {
      const windowSize = window.innerWidth;
      setMobileSize(windowSize < maxWindowWidth);
    });
  }, [])

  function checkRoutes() {
    let result;
    if (cookies.token) { // User is logged in
      if (!isMobileView) {
        result =
          <Nav className="lt-auto" variant="dark" >
            <Navbar.Toggle aria-controls="navbar-normal" />
            <Navbar.Collapse id="navbar-normal" >
              <NavDropdown title={"User ( " + username + " )"}>
                <ListGroup>
                  <ListGroup.Item action href="/preferences">Preferences</ListGroup.Item>
                  <ListGroup.Item action href="/logout">Logout</ListGroup.Item>
                </ListGroup>
              </NavDropdown>
            </Navbar.Collapse>
          </Nav>
      } else {
        result =
          <ListGroup>
            <ListGroup.Item action href="/preferences">Preferences</ListGroup.Item>
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
            <Nav className="me-auto">
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
          <Navbar.Collapse id="navbar-mobile">
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