import PreferencesSwitchGroup from "./PreferencesSwitchGroup";
import PrefenrecesButtonGroup from "./PreferencesButtonGroup";
import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import PreferenceSelectionDropdown from "./PreferenceSelectionDropdown";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function PreferencesDisplayContent(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [preferences, setPreferences] = useState(null);

  var changeList = [];

  async function savePreferences() {
    const address =
      process.env.REACT_APP_API_ADDRESS + "/userpreferences/preference";

    var finished = new Promise((resolve, reject) => {
      changeList.forEach((element, index) => {
        console.log("Making post request");
        axios
          .post(address, {
            preferenceValue: document.getElementById(element).checked,
            username: props.username,
            preferenceID: element,
            groupID: props.groupid,
          })
          .then((response) => {
            console.log(response);
            console.log(index + " " + changeList.length);
            if (index === changeList.length - 1) resolve();
          })
          .catch((error) => {
            console.log(error);
          });
      });
    });
    finished.then(() => {
      window.location = "/";
    });
  }

  const callSavePreferences = () => {
    savePreferences();
  };

  const saveChange = (e) => {
    if (changeList.includes(e.target.id)) {
      changeList.splice(changeList.indexOf(e.target.id), 1);
    } else {
      changeList.push(e.target.id);
    }
    console.log(changeList);
  };

  const handleGroupSelect = (e) => {
    let newGroupId = e; //set e value as default new groupID

    if (e === "new") {
      //Iterate through array finding first spot where var i is smaller than number in array
      //If no slot is found inbetween we make new one at the end.
      let foundEmpty = false;
      for (var i = 1; i <= preferences[1].length; i++) {
        if (preferences[1][i - 1].groupID > i) {
          foundEmpty = true;
          newGroupId = i;
        }
      }
      if (foundEmpty === false) {
        newGroupId = preferences[1].length + 1;
        console.log(newGroupId + " this is the new group id");
        //made new group
      }
      //Make new preference group with newGroupId
      const address =
        process.env.REACT_APP_API_ADDRESS + "/userpreferences/newpreferences";
      axios
        .post(address, {
          username: props.username,
          groupID: newGroupId,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    const address =
      process.env.REACT_APP_API_ADDRESS + "/login/newSelectedPreference";
    console.log(
      address + " username is " + props.username + " group id is " + newGroupId
    );
    axios
      .post(address, {
        username: props.username,
        groupID: newGroupId,
      })
      .then((response) => {
        console.log(response);
        sessionStorage.removeItem("preferences"); //Remove preferences from local storage after selection of new preference group is succesfull
        window.location.reload(false); //Reload window to load the components again to get new preference group
      })
      .catch((error) => {
        console.log(error);
      });

    //Send query to change users selected groupID to event
    //After selected group is changed remove local storage preferences and reload page
    //Page reloading queries selected preference group again
  };

  useEffect(() => {
    if (preferences != null) {
      /* console.log("loading is false"); */
      setIsLoading(false);
    }
  }, [preferences]);

  useEffect(() => {
    const address =
      process.env.REACT_APP_API_ADDRESS +
      "/userpreferences/user/" +
      props.username +
      "/" +
      props.groupid;
    axios
      .get(address)
      .then((response) => {
        setPreferences(response.data);
        sessionStorage.setItem("preferences", JSON.stringify(response.data));
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  if (isLoading) {
    return <Spinner />;
  } else {
    return (
      <Container>
        <Row className="justify-content-md-center">
          <Row className="justify-content-md-center">
            <Col xs lg="2">
              <h2>Preference {props.groupid}</h2>
            </Col>
            <Col xs lg="2">
              <PreferenceSelectionDropdown
                handleGroupSelect={handleGroupSelect}
                groups={preferences[1]}
              />
            </Col>
          </Row>
          <PreferencesSwitchGroup
            label="Charts side by side"
            name="settingOneRadios"
            checked={preferences[0][0].preferenceValue}
            id="1"
            saveChange={saveChange}
          />
          <PreferencesSwitchGroup
            label="Anomaly chart"
            name="settingTwoRadios"
            checked={preferences[0][1].preferenceValue}
            id="2"
            saveChange={saveChange}
          />
          <PreferencesSwitchGroup
            label="chart 2 toggle"
            name="settingThreeRadios"
            checked={preferences[0][2].preferenceValue}
            id="3"
            saveChange={saveChange}
          />
          <PreferencesSwitchGroup
            label="Chart 3 toggle"
            name="settingFourRadios"
            checked={preferences[0][3].preferenceValue}
            id="4"
            saveChange={saveChange}
          />
          <PreferencesSwitchGroup
            label="chart 4 toggle"
            name="settingFiveRadios"
            checked={preferences[0][4].preferenceValue}
            id="5"
            saveChange={saveChange}
          />
          <PreferencesSwitchGroup
            label="chart 5 toggle"
            name="settingSixRadios"
            checked={preferences[0][5].preferenceValue}
            id="6"
            saveChange={saveChange}
          />
          <PreferencesSwitchGroup
            label="chart 5 toggle"
            name="settingSevenRadios"
            checked={preferences[0][6].preferenceValue}
            id="7"
            saveChange={saveChange}
          />
          <PreferencesSwitchGroup
            label="pie chart toggle"
            name="settingEightRadios"
            checked={preferences[0][7].preferenceValue}
            id="8"
            saveChange={saveChange}
          />
          <Row className="justify-content-md-center">
            <Col xs lg="4">
              <PrefenrecesButtonGroup
                username={props.username}
                groupid={props.groupid}
                savePreferences={callSavePreferences}
              />
            </Col>
          </Row>
        </Row>
      </Container>
    );
  }
}
