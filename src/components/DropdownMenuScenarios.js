import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {DropdownButton, MenuItem, ButtonGroup, Button} from 'react-bootstrap';

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
        this.checkEverythingsOk = this.checkEverythingsOk.bind(this);
    
        this.state = {
            regionallevelSelected: this.props.regionalLevelsDataFromParent[0],
            regionSelected: this.props.regionsDataFromParent[0],
            scenariocollectionSelected: this.props.regionsDataFromParent[0].scenarioCollections[0],
            scenariosSelected: [this.props.scenariosDataFromParent[0].scenarios[0].id],
            periodSelected: this.props.scenariosDataFromParent[0].timePeriods[0].id
        };
    }

    onCheckboxBtnClick(selected) {
        const index = this.state.scenariosSelected.indexOf(selected);
        if (index < 0) {
          this.state.scenariosSelected.push(selected);
        } else if(this.state.scenariosSelected.length>1){
          this.state.scenariosSelected.splice(index, 1);
        }
        this.setState({ scenariosSelected: [...this.state.scenariosSelected] });
        this.sendNewScenarios();
    }

    onRadioBtnClick = (radioButtonSelected) => {
        this.setState({ periodSelected:radioButtonSelected }, () => {
            this.sendNewScenarios();
        });
    }

    sendNewScenarios(){
        this.props.sendChoicesToApp(this.state.regionallevelSelected, 
            this.state.regionSelected, 
            this.state.scenariocollectionSelected, 
            this.state.scenariosSelected, 
            this.state.periodSelected);
    }

    checkEverythingsOk(){

        var regionIDs = [];

        this.props.regionsDataFromParent.map((region, i) =>  
        regionIDs.push(region.id));    

        if(regionIDs.includes(this.state.regionSelected.id)){
            
        }else{
            this.setState({ regionSelected: this.props.regionsDataFromParent[0] }, function(){
                this.sendNewScenarios();
            });
            
        }

        var scenariocollections = [];
        var scenarioIDs = [];

        console.log("Mapattava regionsdata: ", this.props.regionsDataFromParent);

        this.props.regionsDataFromParent.map((region, i) =>
        scenariocollections.push(region.scenarioCollections));

        console.log("Mapatut collectionit: ", scenariocollections);

        for(var i; i < scenariocollections.length; i++){
            for(var a; a < scenariocollections[i].length; a++){
                scenarioIDs.push(scenariocollections[i].id)
            }
        }

        /*for (var i = 0; i < this.props.regionalLevelsDataFromParent.length; i++) { 
            console.log("regionname: ", this.props.regionsDataFromParent[i].name)
            if(this.props.regionsDataFromParent[i].name === this.state.regionSelected.name){
                console.log("Valittu regioni kuuluu valittuun regionalleveliin");
                break;
            }else{
                console.log("Valittu regioni ei kuulu valittuun regionalleveliin")
                this.setState({regionSelected: this.props.regionsDataFromParent[0]}, function() {
                    this.sendNewScenarios();
                });
                break;
            }
        }*/

        /*for (var i = 0; i < this.props.regionsDataFromParent.length; i++){
            //console.log("for this.props.regionsDataFromParent", this.props.regionsDataFromParent[i]);
            for (var a = 0; a < this.props.regionsDataFromParent[i].scenarioCollections.length; a++){
                //console.log("for this.props.regionsDataFromParent[i].scenarioCollections[a].name", this.props.regionsDataFromParent[i].scenarioCollections[a].name);
                //console.log("scenariostate", this.state.scenariocollectionSelected)
                if(this.props.regionsDataFromParent[i].scenarioCollections[a].name === this.state.scenariocollectionSelected.name){
                    console.log("Valittu collection kuuluu valitun regionin collectioneihin");
                    break;
                }
            }
            break;
        }*/
    }

    render () {
        return (
            <div style={{textAlign:"left"}}>
                <h1>Scenarios</h1>
                <p>Regional level</p>
                <DropdownButton title={this.state.regionallevelSelected.name} id="1" onSelect={(evt)=>{
                    this.setState({regionallevelSelected: evt}, function() {
                        this.sendNewScenarios();
                    });}}>
                    {this.props.regionalLevelsDataFromParent.map((regionalleveli, i) =>                       
                        <MenuItem eventKey={regionalleveli} key={i}>{regionalleveli.name}</MenuItem>)}                       
                </DropdownButton>  
                <p>  </p> 

                <p>Region</p>
                <DropdownButton title={this.state.regionSelected.name} id="2" onSelect={(evt)=>{
                    this.setState({regionSelected: evt}, function() {
                        this.sendNewScenarios();
                    });}}>
                    {this.props.regionsDataFromParent.map((regioni, i) =>
                        <MenuItem eventKey={regioni} key={i}>{regioni.name}</MenuItem>)}
                </DropdownButton>   
                {this.checkEverythingsOk()} 
                <p>  </p> 

                <p>Scenario collection</p>
                <DropdownButton title={this.state.scenariocollectionSelected.name} id="3" onSelect={(evt)=>{
                        this.setState({scenariocollectionSelected: evt}, () => {
                            this.sendNewScenarios();
                        })}}>
                        {this.state.regionSelected.scenarioCollections.map((scenariocollectioni, i) =>
                        <MenuItem eventKey={scenariocollectioni} key={i}>{scenariocollectioni.name}</MenuItem>)}
                </DropdownButton>  
                <p>  </p> 

                <p>Scenarios</p>
                <ButtonGroup vertical>
                {/*{console.log("++++++++++++++++")}
                {console.log("Region: ", this.state.regionSelected)}
                {console.log("ScenarioCollection: ", this.state.scenariocollectionSelected)}
                        {console.log("scenariosDataFromParent: ", )}*/}
                    {this.props.scenariosDataFromParent[0].scenarios.map((scenarioi, i) =>
                        <Button color="default" key={i} onClick={() => this.onCheckboxBtnClick(scenarioi.id)} active={this.state.scenariosSelected.includes(scenarioi.id)}>{scenarioi.name}</Button>)}
                </ButtonGroup>
                <p>Selected: {JSON.stringify(this.state.scenariosSelected)}</p>
                <p>  </p>
                {/*{console.log("OK")}
                    {console.log("----------------")}*/}

                <p>Period</p>
                <ButtonGroup vertical>
                    {this.props.scenariosDataFromParent[0].timePeriods.map((periodi, i) =>
                        <Button color="default" key={i} onClick={() => this.onRadioBtnClick(periodi.id)} active={this.state.periodSelected===periodi.id}>{periodi.yearStart+"-"+periodi.yearEnd}</Button>)}
                </ButtonGroup>
                {/*<p>Selected: {JSON.stringify(this.state.radioButtonSelected)}</p>*/}  
            </div>
        )
    }
}

export default DropdownMenuScenarios