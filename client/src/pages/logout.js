import { useEffect } from 'react';

export default function Logout(props) { // Simple "prop" -function without returns

    useEffect(() => {
        props.logout(true); // Returns "true" -value when this function is called
    }, [])

}