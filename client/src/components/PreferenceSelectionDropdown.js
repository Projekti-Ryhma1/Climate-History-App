import { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default function PreferenceSelectionDropdown (props) {
    const [isLoading, setIsLoading] = useState(true);
    const [customViewExists, setCustomViewExists] = useState(false);
    const [number, setNumber] = useState([]);
    const [item, setItem] = useState('');

    const [customViewKey] = useState(2);


    //maps all preference groups into buttons and sets if customview group button is rendered 
    useEffect(() => {
        let numbers = [];
        console.log(JSON.stringify(props) + " props from dropdown");
        props.groups.forEach(element => {
/*             console.log(element.groupID); */
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
            <DropdownButton size="lg" title="Change Preference" onSelect={props.handleGroupSelect}>
                { customViewExists === true && 
                    <Dropdown.Item key={customViewKey} eventKey={customViewKey}>Custom View</Dropdown.Item>
                }
                {item}
                <Dropdown.Item value={number+1} eventKey={'new'}>Create new preference</Dropdown.Item>
            </DropdownButton>
        </>
    );
}