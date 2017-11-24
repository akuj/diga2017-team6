import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

class TodoListHeader extends Component {
    render () {
        return (
            <div className="row">
                <div className="col-md-4"><b>Task</b></div>
                <div className="col-md-4"><b>Due date</b></div>
                <div className="col-md-4"><b>Type</b></div>
            </div>
        )
    }
}

export default TodoListHeader