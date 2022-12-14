import './TempCo2.css';
import AtmosphericCO2LineChart from "../components/AtmosphericCO2LineChart";
import ClimateLineChart from "../components/ClimateLineChart";
import StackedLineChart from "../components/StackedLineChart";
import Composite800kLineChart from "../components/Composite800kLineChart";
import VostokIceLineChart from "../components/VostokIceLineChart";
import EvoGlobalTempBiaxiallinechart from "../components/EvoGlobalTempBiaxiallinechart";
import { useCookies } from 'react-cookie';
import jwtDecode from 'jwt-decode';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useEffect, useState} from "react";
import axios from "axios";

// maxWindowWidth: Horizontal window width limit for more mobile friendly solution

export default function TempCo2(props){
    const [preferences, setPreferences] = useState(null);
    const [largeDisplayCharts, setLargeDisplayCharts] = useState(1);
    const [user, setUser] = useState(null);
    const [selectedVisualisation, setSelectedVisualisation] = useState(null);
    const [cookies] = useCookies(['token']);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(selectedVisualisation != null){
            const address = process.env.REACT_APP_API_ADDRESS + "/userpreferences/user/" + user + "/" + selectedVisualisation;
            axios.get(address)
            .then((response) => {
                if(response.data[0].length === 0){
                    setSelectedVisualisation(1);
                }
                else if(response.data[0].length != 0){
                    setPreferences(response.data[0]);
                    if(response.data[0][0].preferenceValue == true) { setLargeDisplayCharts(2); } //Set if charts are loaded side by side on large displays
                }
            }).catch(error => {
                alert(error);
            });
        }
        setTimeout(() =>{
            setIsLoading(false);
        }, 500);
    }, [selectedVisualisation, user])

    useEffect(() => {
        //If user is logged in get loggedin users username
        if(cookies.token) { 
            let decodedToken = jwtDecode(cookies.token);
            let username = decodedToken.username;
            setUser(username);
            const address =  process.env.REACT_APP_API_ADDRESS + "/login/selectedPreference/" + username;

            axios.get(address)
            .then((response) => {
                const id = response.data[0].selectedPreference; //Set the selected preference group ID that we fetched from server
                setSelectedVisualisation(id);
            }).catch(error => {
                alert(error);
            });
        }
    }, [])

    if(isLoading){
        return
    }
    else if(cookies.token) return(
        <Container fluid>
            <h1>Climate data</h1>
            <Row lg={largeDisplayCharts} md="1" sm="1">
                { preferences[1].preferenceValue == true && /* checks if the preference is toggled and renders chart if true */
                    <Col md="1">
                        <ClimateLineChart/>
                    </Col>
                }
                { preferences[2].preferenceValue == true &&
                    <Col  md="1">
                        <AtmosphericCO2LineChart/>
                    </Col>
                }  
                { preferences[3].preferenceValue == true &&
                    <Col  md="1">
                        <VostokIceLineChart/>
                    </Col>
                }
                { preferences[4].preferenceValue == true &&
                    <Col  md="1">
                    <Composite800kLineChart/>
                    </Col>
                }
                { preferences[5].preferenceValue == true &&
                    <Col  md="1">
                        <EvoGlobalTempBiaxiallinechart/>
                    </Col>
                }
                { preferences[6].preferenceValue == true &&
                    <Col  md="1">
                        <StackedLineChart maxWindowWidth={props.maxWindowWidth}/>
                    </Col>
                }
            </Row>
        </Container>
    )
    else{
        return(
            <div className="tempco2" style={{marginTop: '10px', marginBottom: '50px'}}>
            <ClimateLineChart/>
            <AtmosphericCO2LineChart/>
            <VostokIceLineChart/>
            <Composite800kLineChart/>
            <EvoGlobalTempBiaxiallinechart/>
            <StackedLineChart maxWindowWidth={props.maxWindowWidth}/>
                <></>
            </div>
        )
    }
}