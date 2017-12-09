import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {DropdownButton, MenuItem, ButtonGroup, Button} from 'react-bootstrap';

class Indicators extends React.Component {

    constructor (props) {
        super(props);

        this.onCheckboxBtnClick = this.onCheckboxBtnClick.bind(this);
        this.sendNewIndicators = this.sendNewIndicators.bind(this);

        this.state = {
            woodProduction: ['Stump price','Present value of net incomes','Removal','Volume'],
            biodiversity: ['Amount of decaying wood','Number of vascular plants','Coverage of bilberry'],
            natural_nonwood_forestProducts: ['Bilberry crop','Cranberry crop','Dewberry crop','Raspberry crop'],
            carbon: 'Amount of Carbon',
            others: 'Biomass',
            indicatorsSelected: []
        };
    }

    onCheckboxBtnClick(selected) {
        const index = this.state.indicatorsSelected.indexOf(selected);

        if (index < 0) {
            this.state.indicatorsSelected.push(selected);
        }
        else if(this.state.indicatorsSelected.length>1) {
            this.state.indicatorsSelected.splice(index, 1);
        }
        this.setState({ indicatorsSelected: [...this.state.indicatorsSelected] });
        this.sendNewIndicators();
    }

    sendNewIndicators(){
        this.props.sendIndicatorChoicesToApp(this.state.indicatorsSelected);
    }

    render () {
        return (
            <div>
                <h1>Indicators</h1>         
                {this.props.scenariosDataFromParent[0].indicatorCategories.map((indicatorCategory, i) =>
                    <div>
                        {indicatorCategory.isMandatory===1 ? 
                        <div><p>{indicatorCategory.name}*</p>
                        <ButtonGroup vertical>
                            {indicatorCategory.indicators.map((indicator, a)=>
                                <Button color="default" key={indicator.id} 
                                onClick={() => this.onCheckboxBtnClick(indicator)}
                                active={this.state.indicatorsSelected.includes(indicator)}>
                                    {indicator.name}                          
                                </Button>
                            )}
                        </ButtonGroup></div>
                        :
                        <div><p>{indicatorCategory.name}</p>
                        <ButtonGroup vertical>
                            {indicatorCategory.indicators.map((indicator, a)=>
                                <Button color="default" key={indicator.id} 
                                onClick={() => this.onCheckboxBtnClick(indicator)}
                                active={this.state.indicatorsSelected.includes(indicator)}>
                                    {indicator.name} 
                                </Button>
                            )}
                        </ButtonGroup></div>
                        }
                        <p></p>
                    </div>
                )}
            </div>
        );
    }
}

export default Indicators;