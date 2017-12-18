import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ButtonGroup, Button, OverlayTrigger, Tooltip} from 'react-bootstrap';

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

    componentDidMount(){
        this.props.scenariosDataFromParent[0].indicatorCategories.map((category, i)=>
            {if(category.isMandatory===1){
                this.onCheckboxBtnClick(category.indicators[0]);
            }}
        )
    }

    onCheckboxBtnClick(selected) {
        const index = this.state.indicatorsSelected.map((indikator)=>
            indikator.id).indexOf(selected.id);

        function compare(a,b) {
            if (a.order < b.order)
              return -1;
            if (a.order > b.order)
              return 1;
            return 0;
        }

        if (index < 0) {
            this.state.indicatorsSelected.push(selected);
            this.state.indicatorsSelected.sort(compare);
        }
        else if(this.state.indicatorsSelected.length>1) {
            this.state.indicatorsSelected.splice(index, 1);
        }
        this.setState({ indicatorsSelected: [...this.state.indicatorsSelected] }, ()=>{
            this.sendNewIndicators();
        });
    }

    onMandatoryCategoryClick(category, selected){
        function compare(a,b) {
            if (a.order < b.order)
                return -1;
            if (a.order > b.order)
                return 1;
            return 0;
        }

        var categoryindicatorIDs = [];
        category.indicators.map((indikator, i)=>
            categoryindicatorIDs.push(indikator.id));

        var selectedIndicatorsIDs = [];
        this.state.indicatorsSelected.map((indigator)=>
            selectedIndicatorsIDs.push(indigator.id));
        
        var categoryHasSelection=0;

        for(var a=0;a<selectedIndicatorsIDs.length;a++){
            if(categoryindicatorIDs.includes(selectedIndicatorsIDs[a])){
                categoryHasSelection++;
            }
        }

        if(categoryHasSelection===0){
            this.onCheckboxBtnClick(category.indicators[0]);
        }else if(categoryHasSelection===1){
            const index = this.state.indicatorsSelected.map((indikator)=>
                indikator.id).indexOf(selected.id);      

            if (index < 0) {
                this.state.indicatorsSelected.push(selected);
                this.state.indicatorsSelected.sort(compare);
            }

            this.setState({ indicatorsSelected: [...this.state.indicatorsSelected] }, ()=>{
                this.sendNewIndicators();
            });
        }else if(categoryHasSelection>1){
            this.onCheckboxBtnClick(selected);
        }
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
    
                this.state.indicatorsSelected.map((indikator)=>
                indikator.id).map((selectedIndicatorID, i) =>
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
                {this.props.scenariosDataFromParent[0]===undefined?'Error':
                this.props.scenariosDataFromParent[0].indicatorCategories.map((indicatorCategory, i) =>
                    <div>
                        {
                        indicatorCategory.isMandatory===1 ? 

                        <div><p id="Options">{indicatorCategory.name}*</p>
                        <ButtonGroup vertical key={i}>
                            {indicatorCategory.indicators.map((indicator, a)=>
                                <OverlayTrigger placement="left" key={a+100} overlay={
                                    <Tooltip id="tooltip">{indicator.description}</Tooltip>}>
                                        <Button className="button" color="default" key={indicator.id} 
                                            onClick={() => this.onMandatoryCategoryClick(indicatorCategory, indicator)}
                                            active={this.state.indicatorsSelected.map((indikator)=>
                                                indikator.id).includes(indicator.id)}>
                                                {indicator.name}                        
                                        </Button>
                                </OverlayTrigger>
                            )}
                        </ButtonGroup></div>

                        :

                        <div><p id="Options">{indicatorCategory.name}</p>
                        <ButtonGroup vertical key={i}>
                            {indicatorCategory.indicators.map((indicator, a)=>
                                <OverlayTrigger placement="left" key={a+200} overlay={
                                    <Tooltip id="tooltip">{indicator.description}</Tooltip>}>
                                        <Button className="button" color="default" key={indicator.id} 
                                            onClick={() => this.onCheckboxBtnClick(indicator)}
                                            active={this.state.indicatorsSelected.map((indikator)=>
                                                indikator.id).includes(indicator.id)}>
                                                {indicator.name} 
                                        </Button>
                                </OverlayTrigger>
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