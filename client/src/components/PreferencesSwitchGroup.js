import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function PreferencesSwitchGroup(props){
    return(
        <Row className="justify-content-md-center">
        <Col xs lg="4">
            <Form>
                <Form.Check
                    defaultChecked={props.checked}
                    type="switch"
                    onChange={props.saveChange}
                    id={props.id}
                    label={props.label}
                    name={props.name}
                />
            </Form>
        </Col>
        </Row>
    )
}