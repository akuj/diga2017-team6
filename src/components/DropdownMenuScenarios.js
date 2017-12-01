import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {DropdownButton, MenuItem, ButtonGroup, ToggleButton, Button} from 'react-bootstrap';
//import {Button, ButtonGroup} from 'reactstrap'

const regionalLevels = ['Regional level 1', 'Regional level 2', 'Regional level 3'];
const regions = ['Region 1', 'Region 2', 'Region 3'];
const scenarioCollections = ['Scenario collection 1', 'Scenario collection 2', 'Scenario collection 3'];
const scenarios = ['Scenario 1', 'Scenario 2', 'Scenario 3'];
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
                {this.sendNewScenarios}
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
                    <Button color="default" onClick={() => this.onCheckboxBtnClick(scenarios[0])} active={this.state.checkboxesSelected.includes(scenarios[0])}>{scenarios[0]}</Button>
                    <Button color="default" onClick={() => this.onCheckboxBtnClick(scenarios[1])} active={this.state.checkboxesSelected.includes(scenarios[1])}>{scenarios[1]}</Button>
                    <Button color="default" onClick={() => this.onCheckboxBtnClick(scenarios[2])} active={this.state.checkboxesSelected.includes(scenarios[2])}>{scenarios[2]}</Button>
                </ButtonGroup>
                {/*<p>Selected: {JSON.stringify(this.state.checkboxesSelected)}</p>*/}
                <p>  </p>

                <p>Period</p>
                <ButtonGroup vertical>
                <Button color="default" onClick={() => this.onRadioBtnClick(periods[0])} active={this.state.radioButtonSelected===periods[0]}>{periods[0]}</Button>
                    <Button color="default" onClick={() => this.onRadioBtnClick(periods[1])} active={this.state.radioButtonSelected===periods[1]}>{periods[1]}</Button>
                    <Button color="default" onClick={() => this.onRadioBtnClick(periods[2])} active={this.state.radioButtonSelected===periods[2]}>{periods[2]}</Button>
                    <Button color="default" onClick={() => this.onRadioBtnClick(periods[3])} active={this.state.radioButtonSelected===periods[3]}>{periods[3]}</Button>
                <Button color="default" onClick={() => this.onRadioBtnClick(periods[4])} active={this.state.radioButtonSelected===periods[4]}>{periods[4]}</Button>
                    {periods.map=((periodi, i) =>
                        <ToggleButton color="default" key={i} onClick={() => this.onRadioBtnClick(periodi)} active={this.state.radioButtonSelected===periodi}>{periodi}</ToggleButton>
                    )}
                    {/*<Button color="default" onClick={() => this.onRadioBtnClick(periods[0])} active={this.state.radioButtonSelected===periods[0]}>{periods[0]}</Button>
                    <Button color="default" onClick={() => this.onRadioBtnClick(periods[1])} active={this.state.radioButtonSelected===periods[1]}>{periods[1]}</Button>
                    <Button color="default" onClick={() => this.onRadioBtnClick(periods[2])} active={this.state.radioButtonSelected===periods[2]}>{periods[2]}</Button>
                    <Button color="default" onClick={() => this.onRadioBtnClick(periods[3])} active={this.state.radioButtonSelected===periods[3]}>{periods[3]}</Button>
                <Button color="default" onClick={() => this.onRadioBtnClick(periods[4])} active={this.state.radioButtonSelected===periods[4]}>{periods[4]}</Button>*/}
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