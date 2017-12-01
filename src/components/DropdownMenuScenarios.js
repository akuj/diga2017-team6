import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {DropdownButton, MenuItem, ButtonGroup, Button} from 'react-bootstrap';
//import {Button, ButtonGroup} from 'reactstrap'

const regionalLevels = ['Regional level 1', 'Regional level 2', 'Regional level 3'];
const regions = ['Region 1', 'Region 2', 'Region 3'];
const scenarioCollections = ['Scenario collection 1', 'Scenario collection 2', 'Scenario collection 3'];
const scenarios = ['Scenario 1', 'Scenario 2'];
const periods = ['Period 1', 'Period 2', 'Period 3', 'Period 4', 'Period 5'];

class DropdownMenuScenarios extends React.Component {

    constructor(props) {
        super(props);
        this.onCheckboxBtnClick = this.onCheckboxBtnClick.bind(this);
        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
        this.sendNewScenarios = this.sendNewScenarios.bind(this);
    
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
        this.sendNewScenarios();
    }

    onRadioBtnClick = (radioButtonSelected) => {
        this.setState({ radioButtonSelected }, () => {
            this.sendNewScenarios();
        });
    }

    sendNewScenarios(){
        this.props.listNameFromParent(this.state.regionallevel, 
            this.state.region, 
            this.state.scenariocollection, 
            this.state.checkboxesSelected, 
            this.state.radioButtonSelected);
    }

    render () {
        return (
            <div style={{textAlign:"left"}}>
                <h1>Scenarios</h1>
                <p>Regional level</p>
                <DropdownButton title={this.state.regionallevel} onSelect={(evt)=>{
                    this.setState({regionallevel: evt}, () => {
                        this.sendNewScenarios();
                    })}}>
                    {regionalLevels.map((regionalleveli, i) =>
                        <MenuItem eventKey={regionalleveli} key={i}>{regionalleveli}</MenuItem>)}
                </DropdownButton>  
                <p>  </p> 
                <p>Region</p>
                <DropdownButton title={this.state.region} onSelect={(evt)=>{
                    this.setState({region: evt}, () => {
                        this.sendNewScenarios();
                    })}}>
                    {regions.map((regioni, i) =>
                        <MenuItem eventKey={regioni} key={i}>{regioni}</MenuItem>)}
                </DropdownButton>    
                <p>  </p> 
                <p>Scenario collection</p>
                <DropdownButton title={this.state.scenariocollection} onSelect={(evt)=>{
                        this.setState({scenariocollection: evt}, () => {
                            this.sendNewScenarios();
                        })}}>
                        {scenarioCollections.map((scenariocollectioni, i) =>
                        <MenuItem eventKey={scenariocollectioni} key={i}>{scenariocollectioni}</MenuItem>)}
                </DropdownButton>  
                <p>  </p> 

                <p>Scenarios</p>
                <ButtonGroup vertical>
                    {scenarios.map((scenarioi, i) =>
                        <Button color="default" key={i} onClick={() => this.onCheckboxBtnClick(scenarioi)} active={this.state.checkboxesSelected.includes(scenarioi)}>{scenarioi}</Button>)}
                </ButtonGroup>
                {/*<p>Selected: {JSON.stringify(this.state.checkboxesSelected)}</p>*/}
                <p>  </p>

                <p>Period</p>
                <ButtonGroup vertical>
                    {periods.map((periodi, i) =>
                        <Button color="default" key={i} onClick={() => this.onRadioBtnClick(periodi)} active={this.state.radioButtonSelected===periodi}>{periodi}</Button>)}
                </ButtonGroup>
                {/*<p>Selected: {JSON.stringify(this.state.radioButtonSelected)}</p>*/}  
            </div>
        )
    }
}

export default DropdownMenuScenarios