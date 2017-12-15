import React, { Component } from 'react'
import {ButtonGroup, Button} from 'react-bootstrap';

class LanguageSelector extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            language:'fi'
        };
    }

    setLanguage(selection){
        this.setState({ language: selection}, () => {
            this.props.sendLanguageToApp(this.state.language)
        });
    }

    render () {
        return (
            <div>
                <ButtonGroup>
                    <Button color="default" key={'fi'} onClick={() => this.setLanguage('fi')} active={this.state.language==='fi'}>FI</Button>
                    <Button color="default" key={'en'} onClick={() => this.setLanguage('en')} active={this.state.language==='en'}>EN</Button>
                </ButtonGroup>
            </div>
        )
    }
}

export default LanguageSelector