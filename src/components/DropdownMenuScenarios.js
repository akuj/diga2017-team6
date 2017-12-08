import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {DropdownButton, MenuItem, ButtonGroup, Button} from 'react-bootstrap';

class DropdownMenuScenarios extends React.Component {

    constructor(props) {
        super(props);
        this.onScenarioBtnClick = this.onScenarioBtnClick.bind(this);
        this.onPeriodBtnClick = this.onPeriodBtnClick.bind(this);
        this.sendNewScenarios = this.sendNewScenarios.bind(this);
        this.checkSelectionIsPartOfOptions = this.checkSelectionIsPartOfOptions.bind(this);
    
        this.state = {
            regionallevelSelected: this.props.regionalLevelsDataFromParent[0],
            regionSelected: this.props.regionsDataFromParent[0],
            scenariocollectionSelected: this.props.regionsDataFromParent[0].scenarioCollections[0],
            scenariosSelectedIDs: [this.props.scenariosDataFromParent[0].scenarios[0].id],
            scenariosSelectedNames: [this.props.scenariosDataFromParent[0].scenarios[0].description],
            periodSelectedID: this.props.scenariosDataFromParent[0].timePeriods[0].id,
            periodSelectedYears: this.props.scenariosDataFromParent[0].timePeriods[0].yearStart+'-'+this.props.scenariosDataFromParent[0].timePeriods[0].yearEnd
        };
    }

    componentDidMount(){
        this.sendNewScenarios();
    }

    onScenarioBtnClick(selectedID, selectedName) {
        const index = this.state.scenariosSelectedIDs.indexOf(selectedID);
        if (index < 0) {
          this.state.scenariosSelectedIDs.push(selectedID);
          this.state.scenariosSelectedNames.push(selectedName);
        } else if(this.state.scenariosSelectedIDs.length>1){
          this.state.scenariosSelectedIDs.splice(index, 1);
          this.state.scenariosSelectedNames.splice(index, 1);
        }
        this.setState({ scenariosSelectedIDs: [...this.state.scenariosSelectedIDs] }, ()=> {
            this.setState({ scenariosSelectedNames: [...this.state.scenariosSelectedNames] }, ()=> {
                this.sendNewScenarios();
            })
        });
        
    }

    onPeriodBtnClick = (radioButtonSelectedID, radioButtonSelectedYears) => {
        this.setState({ periodSelectedID: radioButtonSelectedID }, () => {
            this.setState({ periodSelectedYears: radioButtonSelectedYears }, ()=>{
                this.sendNewScenarios();
            })
        });
    }

    sendNewScenarios(){
        this.props.sendChoicesToApp(this.state.regionallevelSelected, 
            this.state.regionSelected, 
            this.state.scenariocollectionSelected, 
            this.state.scenariosSelectedIDs,
            this.state.scenariosSelectedNames, 
            this.state.periodSelectedID,
            this.state.periodSelectedYears);
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

        if(optionsScenarioIDs.includes(this.state.scenariosSelectedIDs[0])){

        }else{
            this.setState({ scenariosSelectedIDs: [this.props.scenariosDataFromParent[0].scenarios[0].id] }, ()=>{
                this.setState( { scenariosSelectedNames: [this.props.scenariosDataFromParent[0].scenarios[0].description] }, ()=>{
                    this.sendNewScenarios();
                } )
            })
        }

        //Checking if period options are up to date with the selected scenario collection

        var optionsPeriodIDs = [];

        this.props.scenariosDataFromParent[0].timePeriods.map((periodi, i) =>
            optionsPeriodIDs.push(periodi.id));

        if(optionsPeriodIDs.includes(this.state.periodSelectedID)){

        }else{
            this.setState({ periodSelectedID: this.props.scenariosDataFromParent[0].timePeriods[0].id }, ()=>{
                this.setState({ periodSelectedYears: this.props.scenariosDataFromParent[0].timePeriods[0].yearStart+'-'+this.props.scenariosDataFromParent[0].timePeriods[0].yearEnd }, ()=>{
                    this.sendNewScenarios();
                })
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
                        <Button color="default" key={i} onClick={() => this.onScenarioBtnClick(scenarioi.id, scenarioi.description)} active={this.state.scenariosSelectedIDs.includes(scenarioi.id)}>{scenarioi.description}</Button>)}
                </ButtonGroup>
                <p>  </p>

                <p>Period</p>
                <ButtonGroup vertical>
                    {this.props.scenariosDataFromParent[0].timePeriods.map((periodi, i) =>
                        <Button color="default" key={i} onClick={() => this.onPeriodBtnClick(periodi.id, periodi.yearStart+"-"+periodi.yearEnd)} active={this.state.periodSelectedID===periodi.id}>{periodi.yearStart+"-"+periodi.yearEnd}</Button>)}
                </ButtonGroup>

                {this.checkSelectionIsPartOfOptions()} 
            </div>
        )
    }
}

export default DropdownMenuScenarios