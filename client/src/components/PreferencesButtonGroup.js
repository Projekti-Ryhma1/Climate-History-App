import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function PreferencesButtonGroup(props){
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate=useNavigate();

    async function deleteUser(){
        const address = 'http://localhost:3001/deleteuser';
        axios.delete(address, {
            data: {
                username: props.username
            }
        })  
        .then((response) => {
            console.log(response.status)
            if(response.status==200){
                console.log("user deleted");
                navigate("/logout");
            }
            else { console.log("user deletetion failed"); }
        })
        handleClose();
    }
    return(
        <div className="div-button-group">
            <Button>Exit button</Button>
            <Button onClick={props.savePreferences}>Save button</Button>
            <Button variant="danger" onClick={handleShow}> Delete user </Button>
            <Modal 
            show={show} 
            backdrop="static" 
            centered 
            onHide={handleClose}>
                
                <Modal.Header closeButton>
                    <Modal.Title>Warning</Modal.Title>
                </Modal.Header>
                <Modal.Body>Once you delete your account, there's no getting it back.</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}> Close </Button>
                    <Button variant="danger" onClick={deleteUser}> Delete User </Button>
                    </Modal.Footer>
            </Modal>
        </div>
    );
}