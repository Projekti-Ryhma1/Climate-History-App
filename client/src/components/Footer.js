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
                        <h5 className="text-uppercase">About us</h5>
                        <p>
                        Ilmastonmuutos on vakava asia, siksi haluamme tuoda helposti ymmärrettävän visualisoidun näkymän ilmastonmuutoksesta 
                        käyttäjälle. Projektin tarkoituksena on kasvattaa tietoisuutta ilmastonmuutoksesta ja ihmisen vaikutuksesta ympäristöömme.
                        </p>
                    </Col>

                    <hr className="clearfix w-100 d-md-none pb-0"/>

                    <Col md="3">
                        <h5 className="text-uppercase">Descriptions</h5>
                        <ul className="list-unstyled">
                            <li><a href="https://oamk-my.sharepoint.com/:w:/g/personal/lassehav_oamk_fi/EQNurDErbVxFtkHSsM1IDaUB-I948CtfTnUlEEkuFjrSRQ?e=e0IxiS">V1</a></li>
                            <li><a href="https://bolin.su.se/data/moberg-2012-nh-1?n=moberg-2005">V2</a></li>
                            <li><a href="https://gml.noaa.gov/ccgg/trends/">V3</a></li>
                            <li><a href="https://cdiac.ess-dive.lbl.gov/trends/co2/lawdome.html">V4</a></li>
                            <li><a href="https://cdiac.ess-dive.lbl.gov/trends/co2/vostok.html">V5</a></li>
                            <li><a href="https://www.ncei.noaa.gov/access/paleo-search/study/17975">V6</a></li>
                            <li><a href="https://climate.fas.harvard.edu/files/climate/files/snyder_2016.pdf">V7</a></li>
                            <li><a href="https://www.icos-cp.eu/science-and-impact/global-carbon-budget/2021">V8</a></li>
                            <li><a href="https://ourworldindata.org/emissions-by-sector#co2-emissions-by-sector">V9</a></li>
                            <li><a href="https://climate.fas.harvard.edu/files/climate/files/snyder_2016.pdf">V10 part 1</a></li>
                            <li><a href="https://cdiac.ess-dive.lbl.gov/trends/co2/lawdome.html">V10 part 2</a></li>
                        </ul>
                    </Col>

                    <Col md="3">
                        <h5 className="text-uppercase">Datasets</h5>
                        <ul className="list-unstyled">
                            <li><a href="https://www.metoffice.gov.uk/hadobs/hadcrut5/data/current/download.html">V1</a></li>
                            <li><a href="https://www.ncei.noaa.gov/pub/data/paleo/contributions_by_author/moberg2005/nhtemp-moberg2005.txt">V2</a></li>
                            <li><a href="https://gml.noaa.gov/ccgg/about/co2_measurements.html">V3</a></li>
                            <li><a href="https://cdiac.ess-dive.lbl.gov/ftp/trends/co2/lawdome.combined.dat">V4</a></li>
                            <li><a href="https://cdiac.ess-dive.lbl.gov/ftp/trends/co2/vostok.icecore.co2">V5</a></li>
                            <li><a href="https://www.ncei.noaa.gov/pub/data/paleo/icecore/antarctica/antarctica2015co2composite.txt">V6</a></li>
                            <li><a href="http://carolynsnyder.com/publications.php">V7</a></li>
                            <li><a href="https://data.icos-cp.eu/licence_accept?ids=%5B%22lApekzcmd4DRC34oGXQqOxbJ%22%5D">V8</a></li>
                            <li><a href="https://ourworldindata.org/uploads/2020/09/Global-GHG-Emissions-by-sector-based-on-WRI-2020.xlsx">V9</a></li>
                            <li><a href="https://www.southampton.ac.uk/~cpd/history.html">V10</a></li>
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