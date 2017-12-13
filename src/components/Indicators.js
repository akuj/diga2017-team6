import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ButtonGroup, Button} from 'react-bootstrap';

var firstOptionActivated = false;
var indicatorsSelectedIDs = [];

class Indicators extends React.Component {

    constructor (props) {
        super(props);

        this.onCheckboxBtnClick = this.onCheckboxBtnClick.bind(this);
        this.sendNewIndicators = this.sendNewIndicators.bind(this);
        this.changeLanguageOfSelections = this.changeLanguageOfSelections.bind(this);

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

        if(this.props.scenariosDataFromParent[0]!==undefined){
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

        this.changeLanguageOfSelections();
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

    changeLanguageOfSelections(){
        var availableIndicators = [];

        //Check selected indicators are in the selected language
        if(this.props.scenariosDataFromParent!==undefined){
            this.props.scenariosDataFromParent[0].indicatorCategories.map((indicatorcategory, i)=>
            indicatorcategory.indicators.map((indicator, a)=>
                availableIndicators.push(indicator)));

            this.state.indicatorsSelected.map((indicator, i)=>
                {if(availableIndicators.find(function isSelectedIndicator(indikator){
                    return indikator.id === indicator.id;
                    }).description!==indicator.description){
                        let newIndicators = this.state.indicatorsSelected.slice();
                        newIndicators[i] = availableIndicators.find(function isSelectedIndicator(indikator){
                            return indikator.id === indicator.id;
                            })
                        this.setState({ indicatorsSelected : newIndicators }, () => {
                            this.sendNewIndicators();
                        })
                    }
                }
            )
        }
    }

    render () {
        return (
            <div>
                <h1>{this.props.language==='fi'?'Indikaattorit':'Indicators'}</h1>         
                {this.props.scenariosDataFromParent[0]===undefined?'Error':this.props.scenariosDataFromParent[0].indicatorCategories.map((indicatorCategory, i) =>
                    <div>
                        {
                        indicatorCategory.isMandatory===1 ? 
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