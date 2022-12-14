import EmissionPieChart from "../components/EmissionPieChart";
import { useCookies } from 'react-cookie';
import jwtDecode from 'jwt-decode';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useEffect, useState} from "react";
import axios from "axios";

export default function Emissions(props){
    const [preferences, setPreferences] = useState(null);
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
        <div>
            { preferences[7].preferenceValue == true &&
                <EmissionPieChart/>
            }
            { preferences[7].preferenceValue == false &&
                <h1>You have disabled the chart, please enable it in preferences if you would like to see it</h1>
            }
        </div>
    )
    else return(
        <div>
            <EmissionPieChart maxWindowWidth={props.maxWindowWidth} />
        </div>
    )
}