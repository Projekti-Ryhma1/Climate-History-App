import Button from 'react-bootstrap/Button'

export default function PreferencesButtonGroup(props){
    return(
        <div className="div-button-group">
            <Button>Exit button</Button>
            <Button onClick={props.savePreferences}>Save button</Button>
        </div>
    );
}