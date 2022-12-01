import PreferencesDisplayContent from '../components/PreferencesDisplayContent'; 
import { useCookies } from 'react-cookie';
import jwtDecode from 'jwt-decode';

export default function Preferences(){
    const[cookies] = useCookies(['token']);

    let preferencesDisplay = 
    <>
        <h2>No valid token provided</h2>
    </>

    if(cookies.token) {
        let decodedToken = jwtDecode(cookies.token);
        let username = decodedToken.username;

        preferencesDisplay = 
        <>
            <PreferencesDisplayContent username={username}/>
        </>
    }

    return(
        <div>
            This is the preferences page
            {preferencesDisplay}
        </div>
    )
}