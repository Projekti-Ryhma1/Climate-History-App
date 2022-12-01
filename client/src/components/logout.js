import { useEffect } from 'react';

export default function Logout(props) {
    useEffect(() => {
        props.logout(true);
    }, [])

}