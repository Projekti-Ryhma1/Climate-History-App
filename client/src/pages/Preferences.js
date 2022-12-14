import PreferencesDisplayContent from '../components/PreferencesDisplayContent'; 
import { useCookies } from 'react-cookie';
import jwtDecode from 'jwt-decode';
import axios from "axios";
import { useEffect, useState } from 'react';
import Spinner from "../components/Spinner";

export default function Preferences(){
    const[cookies] = useCookies(['token']);
    const [selectedVisualisation, setSelectedVisualisation] = useState(null);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    //Gets user group and name and sets them
    useEffect(() => {
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

    //Stops loading once user and group is loaded
    useEffect(() => {
        if(selectedVisualisation !== null && user !== null)
        {
            setIsLoading(false); //Disable spinner
        }
    }, [selectedVisualisation, user])

    if(isLoading){ //Show spinner until server returns information
        return(
          <Spinner/>  
        )   
    } else {
    return(
        <div>
            <PreferencesDisplayContent username={user} groupid={selectedVisualisation}/>
        </div>
    )
    }
}