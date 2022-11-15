import PreferencesSwitchGroup from "./PreferencesSwitchGroup"
import PrefenrecesButtonGroup from "./PreferencesButtonGroup"
import axios from "axios";
import {useEffect, useState} from "react"

export default function PreferencesDisplayContent(){
    const [username, setUsername] = useState ("Matti");
    const [preferences, setPreferences] = useState(null);

    useEffect(() => {
        const address = "http://localhost:3001/preferences/" + username;
        axios.get(address)
        .then((response) => {
            console.log(response.data);
            setPreferences(response.data);
        }).catch(error => {
            alert("Retrieving user preferences failed " + error);
        });
    }, [])

    const checked = true;
    return(
        <div className="div-centered">
            <PreferencesSwitchGroup label="Charts side by side" name="settingOneRadios" checked={checked} id="1"/>
            <PreferencesSwitchGroup label="Anomaly chart" name="settingTwoRadios" checked={checked} id="2"/>
            <PreferencesSwitchGroup label="chart 2 toggle" name="settingThreeRadios" id="3"/>
            <PreferencesSwitchGroup label="Chart 3 toggle" name="settingFourRadios" id="4"/>
            <PreferencesSwitchGroup label="chart 4 toggle" name="settingFiveRadios" checked={checked} id="5"/>
            <PreferencesSwitchGroup label="chart 5 toggle" name="settingSixRadios" id="6"/>
            <PrefenrecesButtonGroup/>
        </div>
    )
}