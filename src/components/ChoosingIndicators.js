import React, { Component } from 'react';
import Checkbox from './Checkbox';


const products = [
    'Bilberry crop',
    'Cranberry crop',
    'Dewberry crop',
    'Strawberry crop',
    'Raspberry crop'
];


class ChoosingIndicators extends React.Component {
    componentWillMount = () => {
        this.selectedCheckboxes = new Set();        
    }

    toggleCheckbox = label => {
        if (this.selectedCheckboxes.has(label)) {
            this.selectedCheckboxes.delete(label);
        }
        else {
            this.selectedCheckboxes.add(label);
        }
    }

    handleFormSubmit = formSubmitEvent => {
        formSubmitEvent.preventDefault();

        for (const Checkbox of this.selectedCheckboxes) {
            console.log(Checkbox, 'is selected');
        }
    }

    createCheckbox = label => (
        <Checkbox
        label={label}
        handleCheckboxChange={this.toggleCheckbox}
        key={label}
        />
    )

    createCheckboxes = () => (
        products.map(this.createCheckbox)       
    )

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">

                        <h2>Products</h2>
                        <form onSubmit={this.handleFormSubmit}>
                            {this.createCheckboxes()}

                            <button className="btn btn-default" type="submit">Save</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChoosingIndicators;