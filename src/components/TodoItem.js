import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

class TodoItem extends Component {
    render () {
        const { description, dueDate, type } = this.props;
        return (
            <div className="row">
                <div className="col-md-4">{ description }</div>
                <div className="col-md-4">{ dueDate }</div>
                <div className="col-md-4">{ type }</div>
            </div>
        )
    }
}

export default TodoItem