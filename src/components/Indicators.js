import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {DropdownButton, MenuItem, ButtonGroup, Button} from 'react-bootstrap';

var firstOptionActivated = false;
var indicatorsSelectedIDs = [];

class Indicators extends React.Component {

    constructor (props) {
        super(props);

        this.onCheckboxBtnClick = this.onCheckboxBtnClick.bind(this);
        this.sendNewIndicators = this.sendNewIndicators.bind(this);

        this.state = {
            indicatorsSelected: [],
        };
    }

    onCheckboxBtnClick(selected) {
        const index = indicatorsSelectedIDs.indexOf(selected.id);

        if (index < 0) {
            this.state.indicatorsSelected.push(selected);
            indicatorsSelectedIDs.push(selected.id);
        }
        else if(this.state.indicatorsSelected.length>1) {
            this.state.indicatorsSelected.splice(index, 1);
            indicatorsSelectedIDs.splice(index, 1);
        }
        this.setState({ indicatorsSelected: [...this.state.indicatorsSelected] });
        this.sendNewIndicators();
    }

    sendNewIndicators(){
        this.props.sendIndicatorChoicesToApp(this.state.indicatorsSelected);
    }

    checkSelectedIndicatorsArePartOfAvailableOptions(){
        var optionIDs=[];
        var atLeastOneIsSelected = false;

        this.props.scenariosDataFromParent[0].indicatorCategories.map((indicatorCategory) =>
        indicatorCategory.indicators.map((indicator, a)=>
            optionIDs.push(indicator.id)));

        indicatorsSelectedIDs.map((selectedIndicatorID, i) =>
            {if(optionIDs.includes(selectedIndicatorID)){
                atLeastOneIsSelected=true;
            }else{
                this.onCheckboxBtnClick(this.state.indicatorsSelected[i])
            }});

        if(!atLeastOneIsSelected){
            this.onCheckboxBtnClick(this.props.scenariosDataFromParent[0].indicatorCategories[0].indicators[0])
        }
    }

    activateFirstOptionInMandatoryCategory(selected){
        if(!firstOptionActivated){
            firstOptionActivated=true;
            this.state.indicatorsSelected.push(selected);
            indicatorsSelectedIDs.push(selected.id);
            this.setState({ indicatorsSelected: [...this.state.indicatorsSelected] });
            this.sendNewIndicators();
        }
    }

    render () {
        return (
            <div>
                <h1>{this.props.language==='fi'?'Indikaattorit':'Indicators'}</h1>         
                {this.props.scenariosDataFromParent[0].indicatorCategories.map((indicatorCategory, i) =>
                    <div>
                        {indicatorCategory.isMandatory===1 ? 
                        <div><p>{indicatorCategory.name}*</p>
                        <ButtonGroup vertical key={i}>
                            {indicatorCategory.indicators.map((indicator, a)=>
                                <Button color="default" key={indicator.id} 
                                onClick={() => this.onCheckboxBtnClick(indicator)}
                                active={indicatorsSelectedIDs.includes(indicator.id)}>
                                    {indicator.name}     
                                {this.activateFirstOptionInMandatoryCategory(indicator)}                     
                                </Button>
                            )}
                        </ButtonGroup></div>
                        :
                        <div><p>{indicatorCategory.name}</p>
                        <ButtonGroup vertical key={i}>
                            {indicatorCategory.indicators.map((indicator, a)=>
                                <Button color="default" key={indicator.id} 
                                onClick={() => this.onCheckboxBtnClick(indicator)}
                                active={indicatorsSelectedIDs.includes(indicator.id)}>
                                    {indicator.name} 
                                </Button>
                            )}
                        </ButtonGroup></div>
                        }
                        <p></p>
                    </div>
                )}
                {this.checkSelectedIndicatorsArePartOfAvailableOptions()}
            </div>
        );
    }
}

export default Indicators;