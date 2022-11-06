import PreferencesInputGroup from "./PreferencesInputGroup"

export default function PreferencesDisplayContent(){
    return(
        <div>
            <PreferencesInputGroup setting="Two charts side by side" name="settingOneRadios"/>
            <PreferencesInputGroup setting="Temperature anomaly chart" name="settingTwoRadios"/>
        </div>
    )
}