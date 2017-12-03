import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import DropdownMenuScenarios from './components/DropdownMenuScenarios'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        titleText: "Forest Indicator Service",
        regionallevel: "",
        region: "",
        scenariocollection: "",
        scenario: "",
        period: ""
      };    
  }

  callback = (regionalleveli, regioni, scenariocollectioni, scenarioi, periodi) => {
    this.setState({regionallevel: regionalleveli});
    this.setState({region: regioni});
    this.setState({scenariocollection: scenariocollectioni});
    this.setState({scenario: scenarioi});
    this.setState({period: periodi});
  }

  render() {
    return (
      <div className="App">
        <h1>{this.state.titleText}</h1>
        <DropdownMenuScenarios listNameFromParent={this.callback}/>
      </div>
    );
  }
}

export default App;
