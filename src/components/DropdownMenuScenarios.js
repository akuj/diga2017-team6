import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Bootstrap, DropdownButton, MenuItem, Checkbox} from 'react-bootstrap';

class DropdownMenuScenarios extends React.Component {

    constructor(props) {
        super(props);
    
        this.changeTitle = this.changeTitle.bind(this);
        this.state = {
            regionalLevels: ['Regional level 1', 'Regional level 2'],
            regions: ['Region 1', 'Region 2'],
            scenarioCollections: ['Scenario collection 1', 'Scenario collection 2'],
            regionallevel: "default",
            region: "default",
            scenariocollection: "default"
        };
      }

      changeTitle(evt)
      {
        this.setState({btnTitle: evt});
      }

    render () {
        return (
            <div style={{textAlign:"left"}}>
                <h1>Scenarios</h1>
                <p>Regional level</p>
                <DropdownButton title={this.state.regionallevel} onSelect={(evt)=>{
                    this.setState({regionallevel: evt})}}>
                    <MenuItem eventKey={this.state.regionalLevels[0]}>{this.state.regionalLevels[0]}</MenuItem>
                    <MenuItem eventKey={this.state.regionalLevels[1]}>{this.state.regionalLevels[1]}</MenuItem>
                </DropdownButton>  
                <p>  </p> 
                <p>Region</p>
                <DropdownButton title={this.state.region} onSelect={(evt)=>{
                    this.setState({region: evt})}}>
                    <MenuItem eventKey={this.state.regions[0]}>{this.state.regions[0]}</MenuItem>
                    <MenuItem eventKey={this.state.regions[1]}>{this.state.regions[1]}</MenuItem>
                </DropdownButton>    
                <p>  </p> 
                <p>Scenario collection</p>
                <DropdownButton title={this.state.scenariocollection} onSelect={(evt)=>{
                        this.setState({scenariocollection: evt})}}>
                    <MenuItem eventKey={this.state.scenarioCollections[0]}>{this.state.scenarioCollections[0]}</MenuItem>
                    <MenuItem eventKey={this.state.scenarioCollections[1]}>{this.state.scenarioCollections[1]}</MenuItem>
                </DropdownButton>  
                <p>  </p> 
                <p>Scenarios</p>
                <Checkbox>checkboxi</Checkbox>

            </div>
        )
    }
}

export default DropdownMenuScenarios