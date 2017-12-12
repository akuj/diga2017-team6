import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {DropdownButton, MenuItem, ButtonGroup, Button} from 'react-bootstrap';

var scenariosSelectedIDs = [];
var periodSelectedID = "";

class DropdownMenuScenarios extends React.Component {

    constructor(props) {
        super(props);
        this.onScenarioBtnClick = this.onScenarioBtnClick.bind(this);
        this.onPeriodBtnClick = this.onPeriodBtnClick.bind(this);
        this.sendNewScenarios = this.sendNewScenarios.bind(this);
        this.checkSelectionIsPartOfOptions = this.checkSelectionIsPartOfOptions.bind(this);

        scenariosSelectedIDs = [this.props.scenariosDataFromParent[0].scenarios[0].id];
        periodSelectedID = this.props.scenariosDataFromParent[0].timePeriods[0].id;
    
        this.state = {
            regionallevelSelected: this.props.regionalLevelsDataFromParent[0],
            regionSelected: this.props.regionsDataFromParent[0],
            scenariocollectionSelected: this.props.regionsDataFromParent[0].scenarioCollections[0],
            scenariosSelected: [this.props.scenariosDataFromParent[0].scenarios[0]],
            periodSelected: this.props.scenariosDataFromParent[0].timePeriods[0]
        };
    }

    componentDidMount(){
        this.sendNewScenarios();
    }

    onScenarioBtnClick(selectedID, selected) {
        const index = scenariosSelectedIDs.indexOf(selectedID);
        if (index < 0) {
          scenariosSelectedIDs.push(selectedID);
          this.state.scenariosSelected.push(selected);
        } else if(scenariosSelectedIDs.length>1){
          scenariosSelectedIDs.splice(index, 1);
          this.state.scenariosSelected.splice(index, 1);
        }
        this.setState({ scenariosSelectedNames: [...this.state.scenariosSelected] }, ()=> {
            this.sendNewScenarios();
        });
    }

    onPeriodBtnClick = (radioButtonSelectedID, radioButtonSelected) => {
        periodSelectedID = radioButtonSelectedID;
        this.setState({ periodSelected: radioButtonSelected }, ()=>{
            this.sendNewScenarios();
        })        
    }

    sendNewScenarios(){
        this.props.sendChoicesToApp(this.state.regionallevelSelected, 
            this.state.regionSelected, 
            this.state.scenariocollectionSelected, 
            this.state.scenariosSelected, 
            this.state.periodSelected);
    }

    checkSelectionIsPartOfOptions(){

        //Checking if selected region is up to date with the selected region

        var regionIDs = [];

        this.props.regionsDataFromParent.map((region, i) =>  
            regionIDs.push(region.id));    

        if(regionIDs.includes(this.state.regionSelected.id)){
            
        }else{
            this.setState({ regionSelected: this.props.regionsDataFromParent[0] }, function(){
                this.sendNewScenarios();
            });
        }

        //Checking if selected scenariocollection is up to date with the selected region

        if(this.state.regionSelected.scenarioCollections.includes(this.state.scenariocollectionSelected)){

        }else{
            this.setState({ scenariocollectionSelected: this.state.regionSelected.scenarioCollections[0] }, ()=>{
                this.sendNewScenarios();
            })
        }

        //Checking if scenario options are up to date with the selected scenario collection

        var optionsScenarioIDs = [];

        this.props.scenariosDataFromParent[0].scenarios.map((scenarioi, i) =>
            optionsScenarioIDs.push(scenarioi.id));

        if(optionsScenarioIDs.includes(scenariosSelectedIDs[0])){

        }else{
            scenariosSelectedIDs = [this.props.scenariosDataFromParent[0].scenarios[0].id];
            this.setState( { scenariosSelected: [this.props.scenariosDataFromParent[0].scenarios[0]] }, ()=>{
                this.sendNewScenarios();
            } )        
        }

        //Checking if period options are up to date with the selected scenario collection

        var optionsPeriodIDs = [];

        this.props.scenariosDataFromParent[0].timePeriods.map((periodi, i) =>
            optionsPeriodIDs.push(periodi.id));

        if(optionsPeriodIDs.includes(periodSelectedID)){

        }else{
            periodSelectedID = this.props.scenariosDataFromParent[0].timePeriods[0].id;
            this.setState({ periodSelected: this.props.scenariosDataFromParent[0].timePeriods[0] }, ()=>{
                this.sendNewScenarios();
            })        
        }
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
                    {this.props.scenariosDataFromParent[0].scenarios.map((scenarioi, i) =>
                        <Button color="default" key={i} onClick={() => this.onScenarioBtnClick(scenarioi.id, scenarioi)} active={scenariosSelectedIDs.includes(scenarioi.id)}>{scenarioi.name}</Button>)}
                </ButtonGroup>
                <p>  </p>

                <p>Period</p>
                <ButtonGroup vertical>
                    {this.props.scenariosDataFromParent[0].timePeriods.map((periodi, i) =>
                        <Button color="default" key={i} onClick={() => this.onPeriodBtnClick(periodi.id, periodi)} active={periodSelectedID===periodi.id}>{periodi.yearStart+"-"+periodi.yearEnd}</Button>)}
                </ButtonGroup>

                {this.checkSelectionIsPartOfOptions()} 
            </div>
        )
    }
}

export default DropdownMenuScenarios
