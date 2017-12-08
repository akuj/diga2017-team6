import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {DropdownButton, MenuItem, ButtonGroup, Button} from 'react-bootstrap';


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
    '...'
];
const others = [
    '...'
];


class Indicators extends React.Component {
    
    constructor (props) {
        super(props);
        this.state = {
            woodProduction: ['Stump price','Present value of net incomes','Removal','Volume'],
            biodiversity: ['Amount of decaying wood','Number of vascular plants','Coverage of bilberry'],
            natural_nonwood_forestProducts: ['Bilberry crop','Cranberry crop','Dewberry crop','Raspberry crop'],
            carbon: '...',
            others: '...',
            checkboxesSelected: []
        };

        this.onCheckboxBtnClick = this.onCheckboxBtnClick.bind(this);
        this.chooseNewIndicator = this.chooseNewIndicator.bind(this);
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
        this.chooseNewIndicator();
    }

    chooseNewIndicator() {
        this.props.listNameFromParent(
            this.state.woodProduction,
            this.state.biodiversity,
            this.state.natural_nonwood_forestProducts,
            this.state.carbon,
            this.state.others
        );
    }

    render () {
        return (
            <div>
                <h2>Choosing Indicators</h2>
                <p>Wood Production</p>
                <ButtonGroup vertical>
                    {woodProduction.map((indicator1, i) =>
                        <Button
                        color="grey"
                        key={i}
                        onClick={() => this.onCheckboxBtnClick(indicator1)}
                        active={this.state.checkboxesSelected.includes(indicator1)}>
                        {indicator1}
                        </Button>
                    )}
                </ButtonGroup>
                
                <p>Biodiversity</p>
                <ButtonGroup vertical>
                    {biodiversity.map((indicator2, i) =>
                    <Button
                    color="black"
                    key={i}
                    onClick={() => this.onCheckboxBtnClick(indicator2)}
                    active={this.state.checkboxesSelected.includes(indicator2)}>
                    {indicator2}
                    </Button>
                    )}
                </ButtonGroup>
                
                <p>Natural/Non-wood Production</p>
                <ButtonGroup vertical>
                    {natural_nonwood_forestPrducts.map((indicator3, i) =>
                    <Button
                    color="default"
                    key={i}
                    onClick={() => this.onCheckboxBtnClick(indicator3)}
                    active={this.state.checkboxesSelected.includes(indicator3)}>
                    {indicator3}
                    </Button>
                    )}
                </ButtonGroup>

                <p>Carbon</p>
                <ButtonGroup vertical>
                    {carbon.map((indicator4, i) =>
                    <Button
                    color="default"
                    key={i}
                    onClick={() => this.onCheckboxBtnClick(indicator4)}>
                    {indicator4}
                    </Button>
                    )}
                </ButtonGroup>

                <p>Others</p>
                <ButtonGroup vertical>
                    {others.map((indicator5, i) =>
                    <Button
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