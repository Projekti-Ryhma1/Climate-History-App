import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function PreferencesSwitchGroup(props){
    return(
        <div className="div-switch-group">
                <Form className="mb-3">
                    <Row>
                        <Col>
                            <Form.Check 
                                defaultChecked={props.checked}
                                type="switch"
                                onChange={props.saveChange}
                                id={props.id}
                                label={props.label}
                                name={props.name}
                            />
                        </Col>
                    </Row>
                </Form>
        </div>
    )
}