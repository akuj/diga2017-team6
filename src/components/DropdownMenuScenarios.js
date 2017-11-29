import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Bootstrap, DropdownButton, MenuItem, ToggleButton, ToggleButtonGroup} from 'react-bootstrap';
import {Button, ButtonGroup} from 'reactstrap'

const regionalLevels = ['Regional level 1', 'Regional level 2'];
const regions = ['Region 1', 'Region 2'];
const scenarioCollections = ['Scenario collection 1', 'Scenario collection 2'];
const scenarios = ['Scenario 1', 'Scenario 2'];

class DropdownMenuScenarios extends React.Component {

    constructor(props) {
        super(props);
        this.onCheckboxBtnClick = this.onCheckboxBtnClick.bind(this);
    
        this.state = {
            regionallevel: regionalLevels[0],
            region: regions[0],
            scenariocollection: scenarioCollections[0],
            checkboxesSelected: []
        };
    }

    onCheckboxBtnClick(selected) {
        const index = this.state.check.indexOf(selected);
        if (index < 0) {
          this.state.checkboxesSelected.push(selected);
        } else {
          this.state.checkboxesSelected.splice(index, 1);
        }
        this.setState({ checkboxesSelected: [...this.state.checkboxesSelected] });
    }

    render () {
        return (
            <div style={{textAlign:"left"}}>
                <h1>Scenarios</h1>
                <p>Regional level</p>
                <DropdownButton title={this.state.regionallevel} onSelect={(evt)=>{
                    this.setState({regionallevel: evt})}}>
                    <MenuItem eventKey={regionalLevels[0]}>{regionalLevels[0]}</MenuItem>
                    <MenuItem eventKey={regionalLevels[1]}>{regionalLevels[1]}</MenuItem>
                </DropdownButton>  
                <p>  </p> 
                <p>Region</p>
                <DropdownButton title={this.state.region} onSelect={(evt)=>{
                    this.setState({region: evt})}}>
                    <MenuItem eventKey={regions[0]}>{regions[0]}</MenuItem>
                    <MenuItem eventKey={regions[1]}>{regions[1]}</MenuItem>
                </DropdownButton>    
                <p>  </p> 
                <p>Scenario collection</p>
                <DropdownButton title={this.state.scenariocollection} onSelect={(evt)=>{
                        this.setState({scenariocollection: evt})}}>
                    <MenuItem eventKey={scenarioCollections[0]}>{scenarioCollections[0]}</MenuItem>
                    <MenuItem eventKey={scenarioCollections[1]}>{scenarioCollections[1]}</MenuItem>
                </DropdownButton>  
                <p>  </p> 
                <p>Scenarios</p>
                <ToggleButtonGroup vertical type="checkbox">
                    <ToggleButton value={1}>{scenarios[0]}</ToggleButton>
                    <ToggleButton value={2}>{scenarios[1]}</ToggleButton>
                </ToggleButtonGroup>

                <h5>Checkbox Buttons</h5>
        <ButtonGroup>
          <Button color="primary" onClick={() => this.onCheckboxBtnClick(1)} active={this.state.checkboxesSelected.includes(1)}>One</Button>
          <Button color="primary" onClick={() => this.onCheckboxBtnClick(2)} active={this.state.checkboxesSelected.includes(2)}>Two</Button>
          <Button color="primary" onClick={() => this.onCheckboxBtnClick(3)} active={this.state.checkboxesSelected.includes(3)}>Three</Button>
        </ButtonGroup>
        <p>Selected: {JSON.stringify(this.state.checkboxesSelected)}</p>

            </div>
        )
    }
}

export default DropdownMenuScenarios