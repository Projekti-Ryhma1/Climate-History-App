import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default function ClipboardCopy({ copyText }) {
    const [isCopied, setIsCopied] = useState(false);
  
    //Copies the text to clipboard
    async function copyTextToClipboard(text) {
      if ('clipboard' in navigator) {
        return await navigator.clipboard.writeText(text);
      } else {
        return document.execCommand('copy', true, text);
      }
    }
  
    //Handles onclick for copy button
    const handleCopyClick = () => {
      copyTextToClipboard(copyText)
        .then(() => {
          setIsCopied(true);
          setTimeout(() => {
            setIsCopied(false);
          }, 1500);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  
    return (
      <div>
        <Row sm="auto" style={{justifyContent:'center'}}>
            <Col md="2" xs="9">
                <Form.Control type="text" value={copyText} readOnly />
            </Col>
            <Col md="auto" xs="3">
                <Button variant="primary" onClick={handleCopyClick}>
                {isCopied ? 'Copied!' : ' Copy '}
                </Button>
            </Col>
        </Row>
      </div>
    );
  }