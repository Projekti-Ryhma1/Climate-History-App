import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


export default function NavBar() {
    return (
        <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Climate Data</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Temperature & CO2 Concentrations</Nav.Link>
            <Nav.Link href="#features">Emissions</Nav.Link>
            <Nav.Link href="#pricing">Custom Page</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

    )
}