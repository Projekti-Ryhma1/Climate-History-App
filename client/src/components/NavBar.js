import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useCookies } from 'react-cookie';
import jwtDecode from 'jwt-decode';

export default function NavBar() {
  const [cookies] = useCookies(['token']);

  let userRoutes = <>
            <Nav.Link href="/signup">Signup</Nav.Link>
            <Nav.Link href="/Login">Login</Nav.Link>
  </>
  if(cookies.token) {
    let decodedToken = jwtDecode(cookies.token);
    let username = decodedToken.username;

    userRoutes = <>
            <Nav.Link href="/logout">Logout ( {username} )</Nav.Link>
    </>
  }

    return (
        <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Climate Data</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Temperature & CO2 Concentrations</Nav.Link>
            <Nav.Link href="/emissions">Emissions</Nav.Link>
            <Nav.Link href="#pricing">Custom Page</Nav.Link>
            { userRoutes }
          </Nav>
        </Container>
      </Navbar>

    )
}