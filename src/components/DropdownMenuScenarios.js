import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {DropdownButton, MenuItem, ButtonGroup, Button, Tooltip, OverlayTrigger} from 'react-bootstrap';

var periodSelectedID = "";

class DropdownMenuScenarios extends React.Component {

    constructor(props) {
        super(props);
        this.onScenarioBtnClick = this.onScenarioBtnClick.bind(this);
        this.onPeriodBtnClick = this.onPeriodBtnClick.bind(this);
        this.sendNewScenarios = this.sendNewScenarios.bind(this);
        this.checkSelectionIsPartOfOptions = this.checkSelectionIsPartOfOptions.bind(this);
        this.checkSelectionIsInCorrectLanguage = this.checkSelectionIsInCorrectLanguage.bind(this);

        periodSelectedID = [this.props.scenariosDataFromParent[0].timePeriods[0].id];
    
        this.state = {
            regionallevelSelected: this.props.regionalLevelsDataFromParent[0],
            regionSelected: this.props.regionsDataFromParent[0],
            scenariocollectionSelected: this.props.regionsDataFromParent[0].scenarioCollections[0],
            scenariosSelected: [this.props.scenariosDataFromParent[0].scenarios[0]],
            periodSelected: this.props.scenariosDataFromParent[0].timePeriods[0],
            regionallevelmenuopen: false,
            scenariomenuopen: false
        };
    }

    componentDidMount(){
        this.sendNewScenarios();
    }

    onScenarioBtnClick(selected) {

        const index = this.state.scenariosSelected.map((skenario)=>
            skenario.id).indexOf(selected.id);

        function compare(a,b) {
            if (a.order < b.order)
              return -1;
            if (a.order > b.order)
              return 1;
            return 0;
        }

        if (index < 0) {
            this.state.scenariosSelected.push(selected);
            this.state.scenariosSelected.sort(compare);
        } else if(this.state.scenariosSelected.length>1){
            this.state.scenariosSelected.splice(index, 1);
        }
            this.setState({ scenariosSelected: [...this.state.scenariosSelected] }, ()=> {
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

    isSelectedRegionalLevel = (regionalLevel) =>{
        return regionalLevel.id === this.state.regionallevelSelected.id;
    }

    isSelectedRegion = (region) => {
        return region.id === this.state.regionSelected.id;
    }

    isSelectedCollection = (collection) => {
        return collection.id === this.state.scenariocollectionSelected.id;
    }

    isSelectedScenario = (skenario) => {
        return skenario.id === this.state.scenariosSelected[0].id;
    }

    checkSelectionIsInCorrectLanguage = () => {
        //Check selected regional level is in the selected language
        if(this.props.regionalLevelsDataFromParent.find(this.isSelectedRegionalLevel)!==this.state.regionallevelSelected){
            this.setState({ regionallevelSelected :  this.props.regionalLevelsDataFromParent.find(this.isSelectedRegionalLevel)}, () => {
                this.sendNewScenarios();
            })
        }

        //Check selected region is in the selected language
        if(this.props.regionsDataFromParent.find(this.isSelectedRegion)!==undefined){
            if(this.props.regionsDataFromParent.find(this.isSelectedRegion).scenarioCollections[0].description!==this.state.regionSelected.scenarioCollections[0].description){
                this.setState({ regionSelected : this.props.regionsDataFromParent.find(this.isSelectedRegion) }, () => {
                    this.setState({ scenariocollectionSelected : this.state.regionSelected.scenarioCollections.find(this.isSelectedCollection)}, () => {
                        this.sendNewScenarios();
                    })
                })
            }
        }
        
        //Check selected scenarios are in the selected language
        if(this.props.scenariosDataFromParent[0]!==undefined){
            this.state.scenariosSelected.map((scenario, i)=>
            {if(this.props.scenariosDataFromParent[0].scenarios.find(function isSelectedScenario(skenario){
                return skenario.id === scenario.id;
            })===undefined){

            }else{
                if(this.props.scenariosDataFromParent[0].scenarios.find(function isSelectedScenario(skenario){
                    return skenario.id === scenario.id;
                }).description!==scenario.description){
                    let newScenarios = this.state.scenariosSelected.slice();
                    newScenarios[i] = this.props.scenariosDataFromParent[0].scenarios.find(function isSelectedScenario(skenario){
                        return skenario.id === scenario.id;
                    })
                    this.setState({ scenariosSelected : newScenarios }, () => {
                        this.sendNewScenarios();
                    })
                }
            }})
        }
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

        var collectionIDs = [];

        this.props.regionsDataFromParent.map((region) =>
            region.scenarioCollections.map((collection) =>
                collectionIDs.push(collection.id)));

        if(collectionIDs.includes(this.state.scenariocollectionSelected.id)){

        }else{
            this.setState({ scenariocollectionSelected: this.state.regionSelected.scenarioCollections[0] }, ()=>{
                this.sendNewScenarios();
            })
        }

        //Checking if scenario options are up to date with the selected scenario collection

        var optionsScenarioIDs = [];

        if(this.props.scenariosDataFromParent[0]!==undefined){
            this.props.scenariosDataFromParent[0].scenarios.map((scenarioi, i) =>
            optionsScenarioIDs.push(scenarioi.id));

            if(!optionsScenarioIDs.includes(this.state.scenariosSelected.map((skenario)=>
                skenario.id)[0])){
                this.setState( { scenariosSelected: [this.props.scenariosDataFromParent[0].scenarios[0]] }, ()=>{
                    this.sendNewScenarios();
                } )   
            }
        }

        //Checking if period options are up to date with the selected scenario collection

        var optionsPeriodIDs = [];

        if(this.props.scenariosDataFromParent[0]!==undefined){
            this.props.scenariosDataFromParent[0].timePeriods.map((periodi, i) =>
            optionsPeriodIDs.push(periodi.id));

            if(!optionsPeriodIDs.includes(periodSelectedID)){
                periodSelectedID = this.props.scenariosDataFromParent[0].timePeriods[0].id;
                this.setState({ periodSelected: this.props.scenariosDataFromParent[0].timePeriods[0] }, ()=>{
                    this.sendNewScenarios();
                })
            }
        }

        this.checkSelectionIsInCorrectLanguage();
    }

    render () {
        return (
            <div style={{textAlign:"left"}}>
                <h1>{this.props.language==='fi'?'Skenaariot':'Scenarios'}</h1>
                <p id="Options">{this.props.language==='fi'?'Aluetaso':'Regional level'}</p>
                <DropdownButton className="button" title={this.state.regionallevelSelected.name} 
                    open={this.state.regionallevelmenuopen} id="1" 
                    onClick={() => this.setState({regionallevelmenuopen:true})}>
                    {this.props.regionalLevelsDataFromParent.map((regionalleveli, i) =>  
                        <OverlayTrigger placement="right" key={i} overlay={
                            <Tooltip id="tooltip">{regionalleveli.description}</Tooltip>}>
                                <MenuItem eventKey={regionalleveli} key={i} onSelect={(evt)=>{
                                    this.setState({regionallevelmenuopen:false});
                                    this.setState({regionallevelSelected: evt}, function() {
                                        this.sendNewScenarios();
                                    });
                                }}>{regionalleveli.name}</MenuItem>
                        </OverlayTrigger>                     
                    )}                       
                </DropdownButton>  
                

                <p id="Options">{this.props.language==='fi'?'Alue':'Region'}</p>
                <DropdownButton className="button" title={this.state.regionSelected.name} id="2" onSelect={(evt)=>{
                    this.setState({regionSelected: evt}, function() {
                        this.sendNewScenarios();
                    });}}>
                    {this.props.regionsDataFromParent.map((regioni, i) =>
                        <MenuItem eventKey={regioni} key={i}>{regioni.name}</MenuItem>)}
                </DropdownButton>   
                <p>  </p> 

                <p id="Options">{this.props.language==='fi'?'Skenaariokokoelma':'Scenario collection'}</p>
                <DropdownButton className="button" title={this.state.scenariocollectionSelected.name} 
                    open={this.state.scenariomenuopen} id="3" 
                    onClick={() => this.setState({scenariomenuopen:true})}>
                        {this.state.regionSelected.scenarioCollections.map((scenariocollectioni, i) =>
                        <OverlayTrigger placement="right" key={i} overlay={
                            <Tooltip id="tooltip">{scenariocollectioni.description}</Tooltip>}>
                                <MenuItem eventKey={scenariocollectioni} key={i}
                                onSelect={(evt)=>{
                                    this.setState({scenariomenuopen:false});
                                    this.setState({scenariocollectionSelected: evt}, function() {
                                        this.sendNewScenarios();
                                    });
                                }}>{scenariocollectioni.name}</MenuItem>
                        </OverlayTrigger>)}
                </DropdownButton>  
                
                <p id="Options">{this.props.language==='fi'?'Skenaariot':'Scenarios'}</p>
                <ButtonGroup vertical>
                    {this.props.scenariosDataFromParent[0]===undefined?'Error':
                    this.props.scenariosDataFromParent[0].scenarios.map((scenarioi, i) =>
                    <OverlayTrigger placement="right" key={i} overlay={
                        <Tooltip id="tooltip">{scenarioi.description}</Tooltip>}>
                            <Button className="button" color="default" key={i} onClick={() => this.onScenarioBtnClick(scenarioi)} active={this.state.scenariosSelected.map((skenario)=>
                            skenario.id).includes(scenarioi.id)}>{scenarioi.name}</Button>
                    </OverlayTrigger>)}
                </ButtonGroup>
                <p>  </p>

                <p id="Options">{this.props.language==='fi'?'Ajankohta':'Period'}</p>
                <ButtonGroup vertical>
                    {this.props.scenariosDataFromParent[0]===undefined?'Error':
                    this.props.scenariosDataFromParent[0].timePeriods.map((periodi, i) =>
                        <Button className="button" color="default" key={i} onClick={() => this.onPeriodBtnClick(periodi.id, periodi)} active={periodSelectedID===periodi.id}>{periodi.yearStart+"-"+periodi.yearEnd}</Button>)}
                </ButtonGroup>

                {this.checkSelectionIsPartOfOptions()} 
            </div>
        )
    }
}

export default DropdownMenuScenarios
