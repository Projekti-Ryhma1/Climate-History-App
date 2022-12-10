import { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default function PreferenceSelectionDropdown (props) {
    const [isLoading, setIsLoading] = useState(true);
    const [customViewExists, setCustomViewExists] = useState(false);
    const [number, setNumber] = useState([]);
    const [item, setItem] = useState('');



    useEffect(() => {
        let numbers = [];
        props.groups.forEach(element => {
            console.log(element.groupID);
            if(element.groupID == 2){
                setCustomViewExists(true);
            }
            else{
                numbers.push(element.groupID);
            }
        });
        setNumber(numbers);

        const items = numbers.map((number) => 
        <Dropdown.Item key={number} eventKey={number}>Preference {number}</Dropdown.Item>
        );

        setItem(items);

        setTimeout(() =>{
            setIsLoading(false);
        }, 500);
    }, [])

    if(isLoading){
        return(
            <>Loading...</>
        );
    } else return(
        <>
            <DropdownButton size="lg" title="Change Preference" onSelect={props.handleSelect}>
            { customViewExists === true && 
            <Dropdown.Item key={2} eventKey={2}>Custom View</Dropdown.Item>
            }
                {item}
            </DropdownButton>
        </>
    );
}