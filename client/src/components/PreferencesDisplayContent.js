import PreferencesSwitchGroup from "./PreferencesSwitchGroup"
import PrefenrecesButtonGroup from "./PreferencesButtonGroup"
import axios from "axios";
import {useEffect, useState} from "react"

export default function PreferencesDisplayContent(){
    const [isLoading, setIsLoading] = useState(true);
    const [username, setUsername] = useState ("example");
    const [preferences, setPreferences] = useState(null);

    var changeList = [];

    async function savePreferences(){
        const address = "http://localhost:3001/userpreferences/preference";

        console.log("hello world")
/*         axios.post(address, {
            preferenceValue: document.getElementById(changeList[i]).checked,
            username: username,
            preferenceID: changeList[i]
        }) */

        changeList.forEach(element => {
/*             console.log(document.getElementById(element).checked);
            console.log(username);
            console.log(element); */
            console.log("Making post request");

            axios.post(address, {
                preferenceValue: document.getElementById(element).checked,
                username: username,
                preferenceID: element
            })
            .then((response) => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
        });
    }

    const callSavePreferences = () => {
        console.log("Testing prop functions");
        savePreferences();
    }

    const saveChange = e => {

        if(changeList.includes(e.target.id)){
            changeList.splice(changeList.indexOf(e.target.id), 1);
        }else{
            changeList.push(e.target.id);
        }
    

        console.log(changeList);
    }

    useEffect(() => {
        if(sessionStorage.getItem("preferences") !== null){
            setPreferences(JSON.parse(sessionStorage.getItem("preferences")));
            console.log("Items loaded from session storage")
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
                 
                <PreferencesSwitchGroup label="Charts side by side" name="settingOneRadios" 
                checked={preferences[0].preferenceValue} id="1" saveChange={saveChange}/>
                <PreferencesSwitchGroup label="Anomaly chart" name="settingTwoRadios" 
                checked={preferences[1].preferenceValue} id="2" saveChange={saveChange}/>                
                <PreferencesSwitchGroup label="chart 2 toggle" name="settingThreeRadios" 
                checked={preferences[2].preferenceValue} id="3" saveChange={saveChange}/>                
                <PreferencesSwitchGroup label="Chart 3 toggle" name="settingFourRadios" 
                checked={preferences[3].preferenceValue} id="4" saveChange={saveChange}/>               
                <PreferencesSwitchGroup label="chart 4 toggle" name="settingFiveRadios" 
                checked={preferences[4].preferenceValue} id="5" saveChange={saveChange}/>               
                <PreferencesSwitchGroup label="chart 5 toggle" name="settingSixRadios" 
                checked={preferences[5].preferenceValue} id="6" saveChange={saveChange}/>
                
                <PrefenrecesButtonGroup savePreferences={callSavePreferences}/>
            </div>
            
        )
    }
}