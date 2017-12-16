import React, { Component } from 'react'
import { Button, Modal, Form, FormGroup, InputGroup, FormControl } from 'react-bootstrap';
class Feedback extends Component {
    
    constructor (props) {
        super(props);
    
        this.state = { 
            showModal: false,
            inputMessageValue: "",
            inputUsernameValue: ""
        };
        
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this.inputMessageChange = this.inputMessageChange.bind(this);
        this.inputUsernameChange = this.inputUsernameChange.bind(this);
    }
    
    close() {
        this.setState({ showModal: false });
    }
    
    open() {
        this.setState({ showModal: true });
        this.setState({ inputMessageValue: "" });
        this.setState({ inputUsernameValue: "" });
    }

    inputMessageChange(event)
    {
        this.setState({ inputMessageValue: event.target.value });
    }

    inputUsernameChange(event)
    {
        this.setState({ inputUsernameValue: event.target.value });
    }
    
    render () {
        var language = this.props.language;
        var subject = language==='fi'?'Palaute':'Feedback';
        var fromusertext = language==='fi'?'Palautetta käyttäjältä: ':'Feedback from username: ';
        var messagetext = language==='fi'?'Viesti: ':'Message: ';
        
        return (
        <div>
        <Button bsStyle="primary" onClick={this.open}>
            {language==='fi'?'Lähetä palautetta':'Send feedback'}
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>{language==='fi'?'Lähetä palautetta':'Send feedback'}</Modal.Title>
          </Modal.Header>
          <Form action={"metsamittari@luke.fi?subject="+subject+"&body="+fromusertext+this.state.inputUsernameValue+"%0D%0A"+messagetext+this.state.inputMessageValue} method="post" enctype="text/plain">
          <Modal.Body>
            <FormGroup>
                <InputGroup>
                    <InputGroup.Addon>{language==='fi'?'Käyttäjänimi: ':'Username: '}</InputGroup.Addon>
                    <FormControl type="text"
                                 onChange={ this.inputUsernameChange }/>
                </InputGroup>
            </FormGroup>
            <FormGroup>
                <InputGroup>
                    <InputGroup.Addon>{language==='fi'?'Viesti: ':'Message: '}</InputGroup.Addon>
                    <FormControl type="text"
                                 onChange={ this.inputMessageChange }/>
                </InputGroup>
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
                <Button bsStyle="primary" onClick={this.close} type="submit">Submit</Button>
                <Button bsStyle="secondary" onClick={this.close}>Cancel</Button>
          </Modal.Footer>
          </Form>
        </Modal>
        </div>
        )
    }
}

export default Feedback