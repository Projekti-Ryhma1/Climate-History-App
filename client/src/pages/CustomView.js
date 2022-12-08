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

    let { username} =useParams();

    useEffect(() => {
        console.log(preferences);
    }, [preferences])

    useEffect(() => {  
            setUrlText(window.location.href);
            const address = "http://localhost:3001/userpreferences/user/" + username;
            axios.get(address)
            .then((response) => {
                console.log("Loaded data from database");
                setPreferences(response.data); 
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
            { preferences[1].preferenceValue == true &&
            <Row>
                <AtmosphericCO2LineChart/>
            </Row>
            }
            { preferences[2].preferenceValue == true &&
            <Row>
                <ClimateLineChart/>
            </Row>
            }  
            { preferences[3].preferenceValue == true &&
            <Row>
                <StackedLineChart/>
            </Row>
            }
            { preferences[4].preferenceValue == true &&
            <Row>
                <Composite800kLineChart/>
            </Row>
            }
            { preferences[5].preferenceValue == true &&
            <Row>
                <EmissionPieChart/>
            </Row>
            }
        </Container>
    );
}