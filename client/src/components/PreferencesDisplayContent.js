import PreferencesInputGroup from "./PreferencesInputGroup"

export default function PreferencesDisplayContent(){
    return(
        <div>
            <PreferencesInputGroup setting="Two charts side by side"/>
            <PreferencesInputGroup setting="Temperature anomaly chart"/>
        </div>
    )
}