import PreferencesSwitchGroup from "./PreferencesSwitchGroup"
import PrefenrecesButtonGroup from "./PreferencesButtonGroup"

export default function PreferencesDisplayContent(){
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