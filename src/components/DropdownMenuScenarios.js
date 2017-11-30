import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Bootstrap, DropdownButton, MenuItem, ToggleButton, ToggleButtonGroup} from 'react-bootstrap';
import {Button, ButtonGroup} from 'reactstrap'

const regionalLevels = ['Regional level 1', 'Regional level 2'];
const regions = ['Region 1', 'Region 2'];
const scenarioCollections = ['Scenario collection 1', 'Scenario collection 2'];
const scenarios = ['Scenario 1', 'Scenario 2'];
const periods = ['Period 1', 'Period 2'];

class DropdownMenuScenarios extends React.Component {

    constructor(props) {
        super(props);
        this.onCheckboxBtnClick = this.onCheckboxBtnClick.bind(this);
        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    
        this.state = {
            regionallevel: regionalLevels[0],
            region: regions[0],
            scenariocollection: scenarioCollections[0],
            checkboxesSelected: [scenarios[0]],
            radioButtonSelected: periods[0]
        };
    }

    onCheckboxBtnClick(selected) {
        const index = this.state.checkboxesSelected.indexOf(selected);
        if (index < 0) {
          this.state.checkboxesSelected.push(selected);
        } else {
          this.state.checkboxesSelected.splice(index, 1);
        }
        this.setState({ checkboxesSelected: [...this.state.checkboxesSelected] });
    }

    onRadioBtnClick = (radioButtonSelected) => {
        this.setState({ radioButtonSelected });
        this.props.listNameFromParent(this.state.regionallevel, 
                                        this.state.region, 
                                        this.state.scenariocollection, 
                                        this.state.scenario, 
                                        this.state.period);
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
                <ButtonGroup vertical>
                    <Button color="default" onClick={() => this.onCheckboxBtnClick(scenarios[0])} active={this.state.checkboxesSelected.includes(scenarios[0])}>{scenarios[0]}</Button>
                    <Button color="default" onClick={() => this.onCheckboxBtnClick(scenarios[1])} active={this.state.checkboxesSelected.includes(scenarios[1])}>{scenarios[1]}</Button>
                </ButtonGroup>
                {/*<p>Selected: {JSON.stringify(this.state.checkboxesSelected)}</p>*/}
                <p>  </p>
                <p>Period</p>
                <ButtonGroup vertical>
                    <Button color="default" onClick={() => this.onRadioBtnClick(periods[0])} active={this.state.radioButtonSelected===periods[0]}>{periods[0]}</Button>
                    <Button color="default" onClick={() => this.onRadioBtnClick(periods[1])} active={this.state.radioButtonSelected===periods[1]}>{periods[1]}</Button>
                </ButtonGroup>
                {/*<p>Selected: {JSON.stringify(this.state.radioButtonSelected)}</p>*/}
                {/*<p>  </p>
                <p>Selections</p>
                <p>Regional level: {this.state.regionallevel}</p>
                <p>Region: {this.state.region}</p>
                <p>Scenario collection: {this.state.scenariocollection}</p>
                <p>Scenarios: {JSON.stringify(this.state.checkboxesSelected)}</p>
                <p>Period: {JSON.stringify(this.state.radioButtonSelected)}</p>*/}
            </div>
        )
    }
}

export default DropdownMenuScenarios