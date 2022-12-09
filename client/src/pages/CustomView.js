import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useParams } from 'react-router-dom';
import axios from "axios";
import {useEffect, useState} from "react";
import Spinner from "../components/Spinner";
import AtmosphericCO2LineChart from "../components/AtmosphericCO2LineChart";
import ClimateLineChart from "../components/ClimateLineChart";
import StackedLineChart from "../components/StackedLineChart";
import Composite800kLineChart from "../components/Composite800kLineChart";
import EmissionPieChart from "../components/EmissionPieChart";
import ClipBoardCopy from "../components/ClipBoardCopy";

export default function CustomView(){
    const [isLoading, setIsLoading] = useState(true);
    const [preferences, setPreferences] = useState(null);
    const [urlText, setUrlText] = useState("");
    const [largeDisplayCharts, setLargeDisplayCharts] = useState(1);

    let { username} =useParams();

    useEffect(() => {  
            setUrlText(window.location.href);
            const address = "http://localhost:3001/userpreferences/user/" + username;
            axios.get(address)
            .then((response) => {
                console.log("Loaded data from database");
                setPreferences(response.data);
                if(response.data[0].preferenceValue == true) { setLargeDisplayCharts(2); }
            }).catch(error => {
                alert(error);
            });
        setTimeout(() =>{
            setIsLoading(false);
        }, 500);
    }, [])

    if(isLoading){
        return <Spinner />
    }
    else if(preferences.length == 0){
        return(
            <h1>Page not found</h1>
        );
    }
    else return(
        <Container fluid>
            <Row>
                <h1>Custom view of {username}</h1>
            </Row>
            <Row>
                <ClipBoardCopy copyText={urlText}/>
            </Row>
            <Row lg={largeDisplayCharts} md="1" sm="1">
                { preferences[1].preferenceValue == true &&
                    <Col>
                    <AtmosphericCO2LineChart/>
                    </Col>
                }
                { preferences[2].preferenceValue == true &&
                    <Col>
                    <ClimateLineChart/>
                    </Col>
                }  
                { preferences[3].preferenceValue == true &&
                    <Col>
                    <StackedLineChart/>
                    </Col>
                }
                { preferences[4].preferenceValue == true &&
                    <Col>
                    <Composite800kLineChart/>
                    </Col>
                }
                { preferences[5].preferenceValue == true &&
                    <Col>
                    <EmissionPieChart/>
                    </Col>
                }
                </Row>
        </Container>
    );
}