import React, { Component } from 'react'
import './HelloWorld.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class HelloWorld extends Component {
    render () {
        return (
            <div className="">
                Hello World! { this.props.text }
                
            </div>
        )
    }
}

export default HelloWorld