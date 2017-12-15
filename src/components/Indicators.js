import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {DropdownButton, MenuItem, ButtonGroup, Button, ToggleButtonGroup, ToggleButton} from 'react-bootstrap';


const woodProduction = [
    'Stump Price',
    'Present value of net incomes',
    'Removal',
    'Volume'
];
const biodiversity = [
    'Amount of decaying wood',
    'Number of vascular plants',
    'Coverage of bilberry'
];
const natural_nonwood_forestPrducts = [
    'Bilberry crop',    
    'Cranberry crop',
    'Dewberry crop',
    'Raspberry crop'
];
const carbon = [
    'Amount of Carbon'
];
const others = [
    'Biomass'
];


class Indicators extends React.Component {
    
    constructor (props) {
        super(props);
        this.state = {
            woodProduction: ['Stump price','Present value of net incomes','Removal','Volume'],
            biodiversity: ['Amount of decaying wood','Number of vascular plants','Coverage of bilberry'],
            natural_nonwood_forestProducts: ['Bilberry crop','Cranberry crop','Dewberry crop','Raspberry crop'],
            carbon: 'Amount of Carbon',
            others: 'Biomass',
            checkboxesSelected: []
        };

        this.onCheckboxBtnClick = this.onCheckboxBtnClick.bind(this);

    }

    onCheckboxBtnClick(selected) {
        const index = this.state.checkboxesSelected.indexOf(selected);

        if (index < 0) {
            this.state.checkboxesSelected.push(selected);
        }
        else if(this.state.checkboxesSelected.length>1) {
            this.state.checkboxesSelected.splice(index, 1);
        }
        this.setState({ checkboxesSelected: [...this.state.checkboxesSelected] });
       
    }


    render () {
        return (
            <div>
                <h1>Categories</h1>
                <p id="Options">Wood Production</p>
                <ButtonGroup vertical>
                    {woodProduction.map((indicator1, i) =>
                        <Button className="button"
                        color="default"
                        key={i}
                        onClick={() => this.onCheckboxBtnClick(indicator1)}
                        active={this.state.checkboxesSelected.includes(indicator1)}>
                        {indicator1}
                        </Button>
                    )}
                </ButtonGroup>
                
                <p id="Options">Biodiversity</p>
                <ButtonGroup vertical>
                    {biodiversity.map((indicator2, i) =>
                    <Button className="button"
                    color="default"
                    key={i}
                    onClick={() => this.onCheckboxBtnClick(indicator2)}
                    active={this.state.checkboxesSelected.includes(indicator2)}>
                    {indicator2}
                    </Button>
                    )}
                </ButtonGroup>
                
                <p id="Options">Natural/Non-wood Production</p>
                <ButtonGroup vertical>
                    {natural_nonwood_forestPrducts.map((indicator3, i) =>
                    <Button className="button"
                    color="default"
                    key={i}
                    onClick={() => this.onCheckboxBtnClick(indicator3)}
                    active={this.state.checkboxesSelected.includes(indicator3)}>
                    {indicator3}
                    </Button>
                    )}
                </ButtonGroup>

                <p id="Options">Carbon</p>
                <ButtonGroup vertical>
                    {carbon.map((indicator4, i) =>
                    <Button className="button"
                    color="default"
                    key={i}
                    onClick={() => this.onCheckboxBtnClick(indicator4)}>
                    {indicator4}
                    </Button>
                    )}
                </ButtonGroup>

                <p id="Options">Others</p>
                <ButtonGroup vertical>
                    {others.map((indicator5, i) =>
                    <Button className="button"
                    color="default"
                    key={i}
                    onClick={() => this.onCheckboxBtnClick(indicator5)}>
                    {indicator5}
                    </Button>
                    )}
                </ButtonGroup>

            </div>
        );
    }
}

export default Indicators;