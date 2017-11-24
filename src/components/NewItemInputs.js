import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

class NewItemInputs extends Component {
    render () {

        let content;
        
        if(this.props.showInputs === false)
        {
            content = (<button className="btn btn-default btn-block">Add new</button>);
        }
        else
        {
            content = (
                <div>
                    <div className="col-md-4">
                        <input type="text" />
                    </div>
                    <div className="col-md-4">
                        <input type="text" />
                    </div>
                    <div className="col-md-4">
                        <input type="text" />
                        <button className="btn btn-success">Save</button>
                        <button className="btn btn-default">Cancel</button>
                    </div>
                </div>);
        }

        return (
            <div className="row">
                { content }                    
            </div>
        )
    }
}

export default NewItemInputs