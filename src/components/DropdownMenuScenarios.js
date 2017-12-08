import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {DropdownButton, MenuItem, ButtonGroup, Button} from 'react-bootstrap';

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
            scenariosSelectedIDs: [this.props.scenariosDataFromParent[0].scenarios[0].id],
            scenariosSelectedNames: [this.props.scenariosDataFromParent[0].scenarios[0].name],
            periodSelected: this.props.scenariosDataFromParent[0].timePeriods[0].id
        };
    }

    onCheckboxBtnClick(selectedID, selectedName) {
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

    onRadioBtnClick = (radioButtonSelected) => {
        this.setState({ periodSelected:radioButtonSelected }, () => {
            this.sendNewScenarios();
        });
    }

    sendNewScenarios(){
        this.props.sendChoicesToApp(this.state.regionallevelSelected, 
            this.state.regionSelected, 
            this.state.scenariocollectionSelected, 
            this.state.scenariosSelectedIDs,
            this.state.scenariosSelectedNames, 
            this.state.periodSelected);
    }

    checkEverythingsOk(){

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
                this.setState({ scenariosSelected: [this.props.scenariosDataFromParent[0].scenarios[0]] }, function(){
                    this.sendNewScenarios();
                })
            });
        }

        //Checking if selected scenarios are up to date with the selected scenario collection

        //if()

        //console.log("scenarioCollectionSelected: ", this.state.scenariocollectionSelected);
        //console.log("scenariosDataFromParent[0].scenarios", this.props.scenariosDataFromParent[0].scenarios);

        /*if(this.state.scenariocollectionSelected.includes(this.props.scenariosDataFromParent[0].scenarios)){

        }*/

        //console.log("Mapatut collectionit[0]: ", scenariocollections[0]);

        /*for(var i = 0; i < scenariocollections.length; i++){
            console.log("scenariocollections[i]: ", scenariocollections[i])
            for(var a = 0; a < scenariocollections[i].length; a++){
                console.log("scenariocollections[i].a: ", scenariocollections[i].a)
            }
            /*scenariocollections.map((collection, a) =>
            console.log("collection id mapissa: ", collection[a].id, ", collection mapissa: ", collection[a]))
    }*/

        //console.log("scenario ID:t: ",scenarioIDs)
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
                    {this.props.scenariosDataFromParent[0].scenarios.map((scenarioi, i) =>
                        <Button color="default" key={i} onClick={() => this.onCheckboxBtnClick(scenarioi.id, scenarioi.name)} active={this.state.scenariosSelectedIDs.includes(scenarioi.id)}>{scenarioi.name}</Button>)}
                </ButtonGroup>
                <p>Selected: {JSON.stringify(this.state.scenariosSelectedIDs)}</p>
                <p>  </p>

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