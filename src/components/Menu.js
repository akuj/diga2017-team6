import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

class Menu extends Component {
    render () {
        return (
            <div>
                <ul className="nav nav-tabs">
                    <li role="presentation" className="active"><a href="#">Todos</a></li>
                    <li role="presentation"><a href="#">Graph</a></li>
                </ul>
            </div>
        )
    }
}

export default Menu