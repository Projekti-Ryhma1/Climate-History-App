import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useParams } from 'react-router-dom';
import axios from "axios";
import {useEffect, useState} from "react";
import { useCookies } from 'react-cookie';
import jwtDecode from 'jwt-decode';
import Spinner from "../components/Spinner";
import AtmosphericCO2LineChart from "../components/AtmosphericCO2LineChart";
import ClimateLineChart from "../components/ClimateLineChart";
import StackedLineChart from "../components/StackedLineChart";
import Composite800kLineChart from "../components/Composite800kLineChart";
import EmissionPieChart from "../components/EmissionPieChart";
import VostokIceLineChart from "../components/VostokIceLineChart";
import EvoGlobalTempBiaxiallinechart from "../components/EvoGlobalTempBiaxiallinechart";
import ClipBoardCopy from "../components/ClipBoardCopy";

export default function CustomView(){
    const [isLoading, setIsLoading] = useState(true);
    const [preferences, setPreferences] = useState(null);
    const [urlText, setUrlText] = useState("");
    const [largeDisplayCharts, setLargeDisplayCharts] = useState(1);
    const [notFound, setNotFound] = useState(true);
    const [cookies] = useCookies(['token']);
    const [createdNewPage, setCreatedNewPage] = useState(false);

    const customViewGroup = 2;

    let { username} = useParams();
    let loggedUser;

    if(cookies.token) {
        let decodedToken = jwtDecode(cookies.token);
        loggedUser = decodedToken.username;
    }

    async function makeNewCustomPreferences(){
        console.log("Creating new custom view");
        const address = process.env.REACT_APP_API_ADDRESS + '/userpreferences/newpreferences';
        //Create new preference group with default customView preference ID
        axios.post(address, {
            username: loggedUser,
            groupID: customViewGroup
        })
        .then((response) => {
            console.log(response);
            setCreatedNewPage(true);
        })
        .catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {  
            setUrlText(window.location.href);
            const address = process.env.REACT_APP_API_ADDRESS + "/userpreferences/user/" + username + "/" + customViewGroup;
            axios.get(address)
            .then((response) => {
                if(response.data[0].length === 0){
                    console.log("No data");
                    if(username === loggedUser){
                        makeNewCustomPreferences();
                    }
                }
                else if(response.data[0].length != 0){
                    setPreferences(response.data[0]);
                    if(response.data[0][0].preferenceValue == true) { setLargeDisplayCharts(2); } //Set if charts are loaded side by side on large displays
                }
            }).catch(error => {
                alert(error);
            });
        setTimeout(() =>{
            setIsLoading(false);
        }, 500);
    }, [createdNewPage])

    useEffect(() => {
        try{
            if(preferences.length != 0){
                setNotFound(false);
            }
        } catch { console.log("Loading...")}

    }, [preferences])

    if(isLoading){
        return <Spinner />
    }
    else if(notFound){
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
                { preferences[6].preferenceValue == true &&
                    <Col>
                    <VostokIceLineChart/>
                    </Col>
                }
                { preferences[7].preferenceValue == true &&
                    <Col>
                    <EvoGlobalTempBiaxiallinechart/>
                    </Col>
                }
                </Row>
        </Container>
    );
}