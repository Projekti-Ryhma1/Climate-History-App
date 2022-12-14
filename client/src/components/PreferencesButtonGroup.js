import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function PreferencesButtonGroup(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  //deletes user
  async function deleteUser() {
    const address = process.env.REACT_APP_API_ADDRESS + "/deleteuser";
    axios
      .delete(address, {
        data: {
          username: props.username,
        },
      })
      .then((response) => {
        console.log(response.status);
        if (response.status == 200) {
          console.log("user deleted");
          navigate("/logout");
        } else {
          console.log("user deletetion failed");
        }
      });
    handleClose();
  }

  //handler after preference group is deleted
  async function handleGroupDeletion() {
    const address =
      process.env.REACT_APP_API_ADDRESS + "/login/newSelectedPreference";
    axios
      .post(address, {
        username: props.username,
        groupID: 1,
      })
      .then((response) => {
        console.log(response);
        sessionStorage.removeItem("preferences"); //Remove preferences from local storage after selection of new preference group is succesfull
        window.location.reload(false); //Reload window to load the components again to get new preference group
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //Sends axios call to delete current preference group
  async function deletePreferenceGroup() {
    const address =
      process.env.REACT_APP_API_ADDRESS + "/userpreferences/deletePreferences";
    console.log(props.groupid);
    axios
      .delete(address, {
        data: {
          username: props.username,
          groupID: props.groupid,
        },
      })
      .then((response) => {
        console.log(response.status);
        if (response.status == 200) {
          handleGroupDeletion();
        }
      })
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <div className="div-button-group">
      <Button onClick={props.savePreferences}>Save button</Button>
      <Button variant="danger" onClick={handleShow}>
        {" "}
        Delete user{" "}
      </Button>
      {props.groupid != 1 && (
        <Button variant="danger" onClick={deletePreferenceGroup}>
          Delete preferences
        </Button>
      )}
      <Modal show={show} backdrop="static" centered onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Once you delete your account, there's no getting it back.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            {" "}
            Close{" "}
          </Button>
          <Button variant="danger" onClick={deleteUser}>
            {" "}
            Delete User{" "}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
