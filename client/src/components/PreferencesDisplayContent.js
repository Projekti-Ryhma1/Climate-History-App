import PreferencesSwitchGroup from "./PreferencesSwitchGroup"
import PrefenrecesButtonGroup from "./PreferencesButtonGroup"
import axios from "axios";
import {useEffect, useState} from "react"

export default function PreferencesDisplayContent(){
    const [isLoading, setIsLoading] = useState(true);
    const [username, setUsername] = useState ("example");
    const [preferences, setPreferences] = useState(null);

    useEffect(() => {
        if(sessionStorage.getItem("preferences") !== null){
            setPreferences(JSON.parse(sessionStorage.getItem("preferences")));
            console.log("Items loaded from session storage storage")
        } else {   
            const address = "http://localhost:3001/userpreferences/user/" + username;
            axios.get(address)
            .then((response) => {
                console.log("Loaded data from database");
                setPreferences(response.data); 
                sessionStorage.setItem("preferences", JSON.stringify(response.data));
            }).catch(error => {
                alert("Retrieving user preferences failed " + error);
            });
        }

        setTimeout(() =>{
            setIsLoading(false);
        }, 500);
    }, [])
    
    if(isLoading){
        return "Loading..."
    }
    else{
        return(
            <div className="div-centered">
                 <PreferencesSwitchGroup label="Charts side by side" name="settingOneRadios" checked={preferences[0].preferenceValue} id="1"/>
                <PreferencesSwitchGroup label="Anomaly chart" name="settingTwoRadios" checked={preferences[1].preferenceValue} id="2"/>
                <PreferencesSwitchGroup label="chart 2 toggle" name="settingThreeRadios" checked={preferences[1].preferenceValue} id="3"/>
                <PreferencesSwitchGroup label="Chart 3 toggle" name="settingFourRadios" checked={preferences[1].preferenceValue} id="4"/>
                <PreferencesSwitchGroup label="chart 4 toggle" name="settingFiveRadios" checked={preferences[0].preferenceValue} id="5"/>
                <PreferencesSwitchGroup label="chart 5 toggle" name="settingSixRadios" checked={preferences[0].preferenceValue} id="6"/>
                <PrefenrecesButtonGroup/>
            </div>
            
        )
    }
}