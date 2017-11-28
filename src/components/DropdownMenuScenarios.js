import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Bootstrap, DropdownButton, MenuItem} from 'react-bootstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class DropdownMenuScenarios extends React.Component {

    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.select = this.select.bind(this);
        this.state = {
          dropdownOpen: false
        };
      }

      handleSelect(event) {
        console.log(event)
    }

    toggle() {
        this.setState({
          dropdownOpen: !this.state.dropdownOpen
        });
      }

    select(event) {
        this.setState({
          dropdownOpen: !this.state.dropdownOpen,
          value: event.target.innerText
        });
      }

    render () {
        
        return (
            <div style={{textAlign:"left"}}>
                <h1>Scenarios</h1>
                <p>Regional level</p>
                <DropdownButton title='Dropdowna' onSelect={function(evt){console.log(evt)}}>
                    <MenuItem eventKey='Regional level 1'>Regional level 1</MenuItem>
                    <MenuItem eventKey='Regional level 2'>Regional level 2</MenuItem>
                </DropdownButton>   
                <p>Region</p>
                <DropdownButton title='Dropdownb' onSelect={function(evt){console.log(evt)}}>
                    <MenuItem eventKey='Region 1'>Region 1</MenuItem>
                    <MenuItem eventKey='Region 2'>Region 2</MenuItem>
                </DropdownButton>    
                <p>Scenario collection</p>
                <DropdownButton title='Dropdownc' onSelect={function(evt){console.log(evt)}}>
                    <MenuItem eventKey='Scenario collection 1'>Scenario collection 1</MenuItem>
                    <MenuItem eventKey='Scenario collection 2'>Scenario collection 2</MenuItem>
                </DropdownButton>     
            </div>
        )
    }
}

export default DropdownMenuScenarios