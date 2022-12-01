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
{/*                         <Col>
                            <Button variant="primary" onClick={() =>consolePrint(props.id)} data={props.id} id="1235">
                                    Click me
                            </Button>
                        </Col> */}
                    </Row>
                </Form>
        </div>
    )
}

/* function consolePrint(test){
    //const $ = document.querySelectorAll('input[type="radio"]')
    const $ = document.querySelectorAll('input[id="'+test+'enabled"]')

    for(var i = 0; i < $.length; i++)
    {
        if($[i].checked)
        {
            console.log("Checked Radio Found!");
            console.log(document.getElementById("1235").data)
        }
    }
} */