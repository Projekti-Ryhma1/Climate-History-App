import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Footer.css'

export default function Footer(){
    return (
        <footer className="page-footer font-small blue pt-4">
            <Container fluid='true' className="text-center text-md-left">
                <Row className="w-100">
                    <Col md="6">
                        <h5 className="text-uppercase">Footer Content</h5>
                        <p>Here you can use rows and columns to organize your footer content.</p>
                    </Col>

                    <hr className="clearfix w-100 d-md-none pb-0"/>

                    <Col md="3">
                        <h5 className="text-uppercase">Links</h5>
                        <ul className="list-unstyled">
                            <li><a href="#!">Link 1</a></li>
                            <li><a href="#!">Link 2</a></li>
                            <li><a href="#!">Link 3</a></li>
                            <li><a href="#!">Link 4</a></li>
                        </ul>
                    </Col>

                    <Col md="3">
                        <h5 className="text-uppercase">Links</h5>
                        <ul className="list-unstyled">
                            <li><a href="#!">Link 1</a></li>
                            <li><a href="#!">Link 2</a></li>
                            <li><a href="#!">Link 3</a></li>
                            <li><a href="#!">Link 4</a></li>
                        </ul>
                    </Col>
                </Row>
            </Container>

            <div className="footer-copyright text-center py-3">© 2022 Copyright: 
                <a className="btn-sm" href="https://github.com/Projekti-Ryhma1/Climate-History-App">GitHub</a>
            </div>
        </footer>
    );
}